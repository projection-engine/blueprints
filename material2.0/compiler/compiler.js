import cloneClass from "../../../../services/utils/misc/cloneClass";

import NODE_TYPES from "../../base/NODE_TYPES";
import getMaterialTemplate from "./materialTemplate";
import resolveStructure from "./resolveStructure";

export default function compiler(n, links) {
    const nodes = n.map(nn => cloneClass(nn))
    const codeString = getMaterialTemplate, uniforms = []

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
        nodes.forEach((n, i) => {
            if (n.getInputInstance && !typesInstantiated[n.id]) {
                toJoin.push(n.getInputInstance(i, uniforms))
                typesInstantiated[n.id] = true
            }
        })
        codeString.inputs = toJoin.join('\n')


        let body = []
        resolveStructure(startPoint, [], links, nodes, body)
        console.log(`
            ${codeString.static}
            
            ${codeString.inputs}
            
            ${codeString.functions}
            
            ${codeString.wrapper(body.join('\n'), startPoint.ambientInfluence)}
        `.replaceAll(/^\s*\n/gm, ''))
        return {
            shader: `
                ${codeString.static}
            
                ${codeString.inputs}
            
                ${codeString.functions}
            
                ${codeString.wrapper(body.join('\n'))}
            `,
            uniforms
        }
    } else
        return undefined
}