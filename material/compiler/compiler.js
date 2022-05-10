import cloneClass from "../../../../engine/utils/cloneClass";

import NODE_TYPES from "../../components/NODE_TYPES";
import deferredTemplate from "./deferredTemplate";
import forwardTemplate from "./forwardTemplate";
import resolveStructure from "./resolveStructure";
import TextureSample from "../nodes/TextureSample";
import {vertex as fwVertex} from "../../../../engine/shaders/mesh/forwardMesh.glsl";
import {vertex} from "../../../../engine/shaders/mesh/meshDeferred.glsl";
import MATERIAL_RENDERING_TYPES from "../../../../engine/templates/MATERIAL_RENDERING_TYPES";
import unlitTemplate from "./unlitTemplate";

function getShadingTemplate(type) {
    switch (type) {
        case MATERIAL_RENDERING_TYPES.FORWARD:
            return forwardTemplate
        case MATERIAL_RENDERING_TYPES.DEFERRED:
            return deferredTemplate
        default:
            return unlitTemplate
    }
}

export default async function compiler(n, links, fileSystem) {
    let nodes = n.map(nn => cloneClass(nn))

    const startPoint = nodes.find(n => {
        return n.type === NODE_TYPES.OUTPUT
    })
    if (startPoint) {
        const samplers = n.filter(e => e instanceof TextureSample), uniformNodes = n.filter(e => e.uniform)
        const {
            code,
            uniforms,
            uniformData
        } = await compileFrag(startPoint, n, links, fileSystem, startPoint.shadingType)
        const vertexBody = compileVertex(startPoint, n, links)
        const v = startPoint.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? fwVertex : vertex
        const cubeMapShader = await compileFrag(
            startPoint,
            n,
            links,
            fileSystem,
            MATERIAL_RENDERING_TYPES.FORWARD,
            [
                'al',
                'normal',
                'ao',
                'roughness',
                'metallic',
                'opacity',
                'emissive',
                'worldOffset'
            ], false)

        return {
            info: [{key: 'samplers', label: 'Texture samplers', data: samplers.length}, {
                key: 'uniforms',
                label: 'Uniform quantity',
                data: uniformNodes.length
            },],
            cubeMapShader,
            shader: code,
            vertexShader: v,
            uniforms,
            uniformData,
            settings: {
                shadingType: startPoint.shadingType,
                isForwardShaded: startPoint.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED,
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


function compileVertex(startPoint, n, links) {
    let vertexBody = []
    const nodes = n.map(nn => cloneClass(nn))
    resolveStructure(startPoint, [], links.filter(l => l.target.id !== startPoint.id || l.target.id === startPoint.id && l.target.attribute.key === 'worldOffset'), nodes, vertexBody, true)
    return vertexBody.join('\n')
}

async function compileFrag(startPoint, n, links, fileSystem, shadingType, discardedLinks=['worldOffset'], ambient = startPoint.ambientInfluence) {
    const nodes = n.map(nn => cloneClass(nn))
    const codeString = getShadingTemplate(shadingType),
        uniforms = [],
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
    resolveStructure(startPoint, [], links.filter(l => l.target.id !== startPoint.id || l.target.id === startPoint.id && !discardedLinks.includes(l.target.key)), nodes, body, false)
    return {
        code: `
            ${codeString.static}
            ${codeString.inputs}
            ${codeString.functions}
            ${codeString.wrapper(body.join('\n'), ambient)}
        `,
        uniforms,
        uniformData
    }

}