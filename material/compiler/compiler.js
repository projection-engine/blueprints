import cloneClass from "../../../../engine/utils/cloneClass";

import NODE_TYPES from "../../components/NODE_TYPES";
import deferredTemplate, {vertex as deferredVertex} from "./deferredTemplate";
import forwardTemplate, {vertex as forwardVertex} from "./forwardTemplate";
import resolveStructure from "./resolveStructure";
import TextureSample from "../nodes/TextureSample";
import {vertex as fwVertex} from "../../../../engine/shaders/mesh/forwardMesh.glsl";
import {vertex} from "../../../../engine/shaders/mesh/meshDeferred.glsl";

export default async function compiler(n, links, fileSystem) {
    let nodes = n.map(nn => cloneClass(nn))

    const startPoint = nodes.find(n => {
        return n.type === NODE_TYPES.OUTPUT
    })
    if (startPoint) {
        const samplers = n.filter(e => e instanceof TextureSample), uniformNodes = n.filter(e => e.uniform)


        const codeString = startPoint.isForwardShaded ? forwardTemplate : deferredTemplate, uniforms = [],
            uniformData = []

        let toJoin = [], typesInstantiated = {}
        nodes.forEach(n => {
            if (n.type === NODE_TYPES.FUNCTION && !typesInstantiated[n.constructor.name]) {

                toJoin.push(n.getFunctionInstance())
                typesInstantiated[n.constructor.name] = true
            }
        })
        codeString.functions = toJoin.join('\n')
        toJoin = []
        typesInstantiated = {}
        await Promise.all(nodes.map((n, i) => new Promise(async resolve => {
            if (typeof n.getInputInstance === 'function' && !typesInstantiated[n.id]) {
                const res = await n.getInputInstance(i, uniforms, uniformData, fileSystem)
                toJoin.push(res)
                resolve()
                typesInstantiated[n.id] = true
            } else resolve()
        })))
        codeString.inputs = toJoin.join('\n')


        let body = []
        resolveStructure(startPoint, [], links.filter(l => l.target.id !== startPoint.id || l.target.id === startPoint.id && l.target.key !== 'worldOffset'), nodes, body, false)

        const code = `
            ${codeString.static}
            ${codeString.inputs}
            ${codeString.functions}
            ${codeString.wrapper(body.join('\n'), startPoint.ambientInfluence)}
        `

        let vertexBody = []
        nodes = n.map(nn => cloneClass(nn))
        console.log(links.filter(l => l.target.id !== startPoint.id || l.target.id === startPoint.id && l.target.attribute.key === 'worldOffset'))
        resolveStructure(startPoint, [], links.filter(l => l.target.id !== startPoint.id || l.target.id === startPoint.id && l.target.attribute.key === 'worldOffset'), nodes, vertexBody, true)
        vertexBody = vertexBody.join('\n')
        const v = startPoint.isForwardShaded ? fwVertex : vertex
        return {
            info: [{key: 'samplers', label: 'Texture samplers', data: samplers.length}, {
                key: 'uniforms',
                label: 'Uniform quantity',
                data: uniformNodes.length
            },],
            shader: code,
            vertexShader: v,//startPoint.isForwardShaded ? forwardVertex(vertexBody, codeString.inputs, codeString.functions) : deferredVertex(vertexBody, codeString.inputs, codeString.functions),
            uniforms,
            uniformData,
            settings: {
                isForwardShaded: startPoint.isForwardShaded,
                rsmAlbedo: startPoint.rsmAlbedo,
                doubledSided: startPoint.doubledSided,

                depthMask: startPoint.depthMask,
                depthTest: startPoint.depthTest,
                cullFace: startPoint.cullFace,
                blend: startPoint.blend,
                blendFuncTarget: startPoint.blendFuncTarget,
                blendFuncSource: startPoint.blendFuncSource,

            }
        }
    } else return {}
}

