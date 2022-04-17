export default async function Make(hook, result) {
    const parsedNodes = hook.nodes.map(n => {
        const docNode = document.getElementById(n.id).parentNode
        const transformation = docNode
            .getAttribute('transform')
            .replace('translate(', '')
            .replace(')', '')
            .split(' ')

        return {
            ...n,
            x: parseFloat(transformation[0]),
            y: parseFloat(transformation[1]),
            instance: n.constructor.name,
            texture: n.texture && typeof n.texture === 'object' ? {registryID: n.texture.registryID} : undefined
        }
    })

    return {

        preview: await hook.engine.toImage(),
        data: JSON.stringify({
            nodes: parsedNodes,
            links: hook.links,
            response: result,
            type: result.variant

        })
    }
}