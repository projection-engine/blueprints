import BOARD_SIZE from "../templates/BOARD_SIZE"

export default async function Make(hook, result) {
    const parsedNodes = hook.nodes.map(n => {
        const docNode = document.getElementById(n.id).parentNode
        const transformation = docNode
            .getAttribute("transform")
            .replace("translate(", "")
            .replace(")", "")
            .split(" ")

        return {
            ...n,
            x: parseFloat(transformation[0]) - BOARD_SIZE/2,
            y: parseFloat(transformation[1]) - BOARD_SIZE/2,
            instance: n.constructor.name,
            texture: n.texture && typeof n.texture === "object" ? {registryID: n.texture.registryID} : undefined
        }
    })

    return {
        data: JSON.stringify({
            nodes: parsedNodes,
            links: hook.links,
            response: result,
            type: result.variant
        })
    }
}