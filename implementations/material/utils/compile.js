import EVENTS from "../../../../../services/utils/misc/EVENTS";
import MaterialClass from "../nodes/Material";
import cloneClass from "../../../../../services/utils/misc/cloneClass";

export default function compile(n, l, fileSystem, final) {
    let links = [...l], nodes = n.map(node => cloneClass(node))


    return new Promise(resolve => {

        const startPoint = nodes.find(n => {
            return n instanceof MaterialClass
        })

        if (startPoint) {
            const resolveDependencies = (currentNode) => {
                const linksToResolve = links.filter(l => l.target.id === currentNode.id)
                const promises = linksToResolve.map(link => {
                    const source = nodes.find(n => n.id === link.source.id)
                    let value

                    if (!source.ready)
                        value = new Promise(resolve1 => {
                            resolveDependencies(source)
                                .then(() => {
                                    resolve1()
                                })
                        })
                    else
                        value = undefined
                    return value
                }).filter(n => n !== undefined)

                return new Promise(resolveLoop => {
                    if (promises.length > 0 || !currentNode.ready)
                        Promise.all(promises)
                            .then(() => {
                                const compiledLinks = linksToResolve.map(l => {
                                    const f = nodes.find(n => n.id === l.source.id)
                                    if (f)
                                        return {
                                            data: f[l.source.attribute.key],
                                            key: l.target.attribute.key
                                        }
                                    else
                                        return undefined
                                }).filter(f => f !== undefined)
                                currentNode.compile(compiledLinks, fileSystem, links.filter(l => l.source.id === currentNode.id).map(l => l.source.attribute.key), final)
                                    .then(() => resolveLoop())
                            })
                    else if (currentNode.ready)
                        resolveLoop()
                })
            }
            resolveDependencies(startPoint)
                .then(() => {

                    resolve(nodes.find(n => {
                        return n instanceof MaterialClass
                    }))
                })
        } else
            resolve()

    })
}