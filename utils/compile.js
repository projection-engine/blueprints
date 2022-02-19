import EVENTS from "../../../pages/project/utils/misc/EVENTS";
import MaterialClass from "../workflows/material/Material";
import cloneClass from "../../../pages/project/utils/misc/cloneClass";

export default function compile(load, n, l, fileSystem) {
    let links = [...l], nodes = n.map(node => cloneClass(node))

    return new Promise(resolve => {
        const startPoint = nodes.find(n => {
            return n instanceof MaterialClass
        })

        if (startPoint) {
            const resolveDependencies = (currentNode) => {
                const linksToResolve = links.filter(l => l.target.id === currentNode.id)
                const forwardLinks = links.filter(l => l.source.id === currentNode.id).map(l => l.source.attribute.key)
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
                    if (promises.length > 0)
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
                                currentNode.compile(compiledLinks, fileSystem, forwardLinks)
                                    .then(() => {
                                        nodes[nodes.findIndex(n => n.id === currentNode.id)] = currentNode
                                        resolveLoop()
                                    })
                            })
                    else if (currentNode.ready)
                        resolveLoop()

                    else {
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
                        currentNode.compile(compiledLinks, fileSystem, forwardLinks)
                            .then(() => {
                                nodes[nodes.findIndex(n => n.id === currentNode.id)] = currentNode
                                resolveLoop()
                            })
                    }
                })
            }
            resolveDependencies(startPoint)
                .then(() => {
                    load.finishEvent(EVENTS.COMPILING)

                    resolve(nodes.find(n => {
                        return n instanceof MaterialClass
                    }))
                })
        } else {
            load.finishEvent(EVENTS.COMPILING)
            resolve()
        }
    })
}