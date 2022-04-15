import cloneClass from "../../../../services/utils/misc/cloneClass";

import NODE_TYPES from "../../base/NODE_TYPES";
import getMaterialTemplate from "./materialTemplate";
import resolveStructure from "./resolveStructure";

export default async function compiler(n, links, fileSystem) {
    const nodes = n.map(nn => cloneClass(nn))
    const codeString = getMaterialTemplate, uniforms = [], uniformData = []

    const startPoint = nodes.find(n => {
        return n.type === NODE_TYPES.OUTPUT
    })
    if (startPoint) {
        let toJoin = [], typesInstantiated = {}
        nodes.forEach(n => {
            if (n.type === NODE_TYPES.FUNCTION && !typesInstantiated[n.constructor.name]) {
                toJoin.push(n.getFunctionInstance())
                typesInstantiated[n.constructor.name] = true
            }
        })
        codeString.functions = toJoin.join('\n')

        typesInstantiated = {}
        await Promise.all(nodes.map((n, i) => new Promise(resolve => {
            if (typeof n.getInputInstance === 'function' && !typesInstantiated[n.id]) {
                n.getInputInstance(i, uniforms, uniformData, fileSystem).then(res => {
                    toJoin.push(res)
                    resolve()
                })
                typesInstantiated[n.id] = true
            } else
                resolve()
        })))
        codeString.inputs = toJoin.join('\n')


        let body = []
        resolveStructure(startPoint, [], links, nodes, body)

        const code = trimString(`#version 300 es
        
precision highp float;
${codeString.static}
            
${codeString.inputs}
            
${codeString.functions}
            
${codeString.wrapper(body.join('\n'), startPoint.ambientInfluence)}
`)
        console.log(code)

        return {
            shader: code,
            uniforms,
            uniformData
        }
    } else
        return undefined
}

export function trimString(str) {
    return str.replaceAll(/^(\s*)/gm, '').replaceAll(/^\s*\n/gm, '')
}