import cloneClass from "../../../../../engine/utils/cloneClass";
import Setter from "../nodes/utils/Setter";
import compiler from "./compiler";

export default async function mapper(hook, engine, file, isLevelBp) {
    const res = await compiler(hook.nodes, hook.links, hook.variables, hook.quickAccess.fileSystem)

    const parsedNodes = hook.nodes.map(n => {
        const docNode = document.getElementById(n.id).parentNode
        const transformation = docNode
            .getAttribute('transform')
            .replace('translate(', '')
            .replace(')', '')
            .split(' ')

        const copy = cloneClass(n)
        if (!(copy instanceof Setter)) {
            delete copy.inputs
            delete copy.outputs
        }
        return {
            ...copy,
            x: parseFloat(transformation[0]),
            y: parseFloat(transformation[1]),

            instance: n.constructor.name
        }
    })
    const parsedGroups = hook.groups.map(n => {
        const docNode = document.getElementById(n.id).parentNode
        const transformation = docNode
            .getAttribute('transform')
            .replace('translate(', '')
            .replace(')', '')
            .split(' ')

        return {
            ...n,
            width: parseFloat(docNode.firstChild.style.width.replace('px', '')),
            height: parseFloat(docNode.firstChild.style.height.replace('px', '')),
            x: parseFloat(transformation[0]),
            y: parseFloat(transformation[1]),

        }
    })

    return JSON.stringify({
        boardResolution: hook.boardResolution,
        nodes: parsedNodes,
        links: hook.links,
        variables: hook.variables,
        response: res,
        groups: parsedGroups,
        type: res.variant,
        entities: isLevelBp ? [] : engine.entities.map(e => {
            e.blueprintID = file.registryID
            return e
        }),
        name: file.name
    })
}
