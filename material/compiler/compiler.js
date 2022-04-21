import cloneClass from "../../../../engine/utils/cloneClass";

import NODE_TYPES from "../../base/NODE_TYPES";
import deferredTemplate from "./deferredTemplate";
import forwardTemplate from "./forwardTemplate";
import resolveStructure from "./resolveStructure";

export default async function compiler(n, links, fileSystem) {
    const nodes = n.map(nn => cloneClass(nn))

    const startPoint = nodes.find(n => {
        return n.type === NODE_TYPES.OUTPUT
    })
    if (startPoint) {
        const codeString = startPoint.isForwardShaded ? forwardTemplate : deferredTemplate, uniforms = [], uniformData = []

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
            } else
                resolve()
        })))
        codeString.inputs = toJoin.join('\n')


        let body = []
        resolveStructure(startPoint, [], links, nodes, body)

        const code = `
            ${codeString.static}
            ${codeString.inputs}
            ${codeString.functions}
            ${codeString.wrapper(body.join('\n'), startPoint.ambientInfluence)}
        `

        return {
            // vertexShader: ,
            shader: code,
            uniforms,
            uniformData,
            settings: {
                isForwardShaded:startPoint.isForwardShaded,
                rsmAlbedo:startPoint.rsmAlbedo,
                doubledSided:startPoint.doubledSided
            }
        }
    } else
        return undefined
}

