import cloneClass from "../../../../../engine/utils/cloneClass"
import NODE_TYPES from "../../../components/NODE_TYPES"
import resolveStructure from "./resolveStructure"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"

export function traceEndpoint(startPoint, nodes, links, previousLink) {
    const s = links.find(l => l.target.id === startPoint.id && l.source.attribute.type === DATA_TYPES.EXECUTION)
    if (!s)
        return {root: startPoint, previousLink}
    else {
        const result = traceEndpoint(nodes.find(n => n.id === s.source.id), nodes, links, s)
        if (result)
            return result
    }
    return null


}

async function compile(startPoint, nodes, links, fileSystem) {
    const codeString = {
            functions: "",
            inputs: ""
        },
        inputs = [],
        inputsData = []
    const {root, previousLink} = traceEndpoint(startPoint, nodes, links)

    if(previousLink) {
        let toJoin = [], typesInstantiated = {}
        nodes.forEach(n => {
            if (n.type === NODE_TYPES.FUNCTION && !typesInstantiated[n.constructor.name]) {
                toJoin.push(n.getFunctionInstance())
                typesInstantiated[n.constructor.name] = true
            }
        })
        codeString.functions = toJoin.join("\n")
        toJoin = []
        typesInstantiated = {}
        await Promise.all(nodes.map((n, i) => new Promise(async resolve => {
            if (typeof n.getInputInstance === "function" && !typesInstantiated[n.id]) {
                const res = await n.getInputInstance(i, inputs, inputsData, fileSystem)
                toJoin.push(res)
                resolve()
                typesInstantiated[n.id] = true
            } else
                resolve()
        })))
        codeString.inputs = toJoin.join("\n")


        let body = []
        resolveStructure(startPoint, [], links, nodes, body)

        const code = root.getFunctionInstance(` 
            ${codeString.inputs}
            ${codeString.functions}
            ${body.join("\n")}
        `, nodes.findIndex(n => n.id === root.id),
        previousLink.source.attribute)

        return {
            code,
            inputs,
            inputsData
        }
    }
    else
        return undefined
}

export default async function compiler(n, links, variables, fileSystem) {
    const nodes = n.map(nn => cloneClass(nn))
    const nodesNotLinked = nodes.filter(nn => nn.output.find(o => o.type === DATA_TYPES.EXECUTION) && !links.find(l => l.source.id === nn.id && l.source.attribute.type === DATA_TYPES.EXECUTION))
    const result = []
    for(const ln in nodesNotLinked) {
        const r = await compile(nodesNotLinked[ln], nodes, links, fileSystem)
        result.push(r)
    }
    const state = {}
    variables.forEach(v => {
        state[v.id] = v.value
    })
    const entryPoints = nodes.filter(n => n.type === NODE_TYPES.START_POINT)

    return `
        {
            state = ${JSON.stringify(state)}
            constructor(){
                 
            }
            execute(params){
                ${entryPoints.map(e => e.getFunctionCall()).join("\n")}
            }
            ${result.filter(e => e).map(r => r.code).join("\n")}
        } 
    `
}

