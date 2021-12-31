import {useEffect, useState} from "react";
import Function from '../templates/basic/functions/Function'

export default function useBoard(initialNodes = [], initialLinks = []) {
    const [nodes, setNodes] = useState(initialNodes)
    const [links, setLinks] = useState(initialLinks)

    const [selected, setSelected] = useState()
    const cloneObj = (obj) => {
        return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
    }
    const checkFields = (node) => {
        let valid = true
        node.inputs.forEach(i => {
            valid = valid && node[i.key] !== undefined
        })
        return valid
    }
    const updateLinks = () => {
        links.forEach(l => {
            const parsed = {
                target: nodes.findIndex(n => n.id === l.target.id),
                targetKey: l.target.attribute.key,
                source: nodes.findIndex(n => n.id === l.source.id),
                sourceKey: l.source.attribute.key
            }

            setNodes(prev => {
                let c = [...prev]
                let targetClone = cloneObj(nodes[parsed.target])
                targetClone[parsed.targetKey] = nodes[parsed.source][parsed.sourceKey]
                c[parsed.target] = targetClone
                return c
            })
            nodes[parsed.target][parsed.targetKey] = nodes[parsed.source][parsed.sourceKey]
        })
    }
    useEffect(() => {
        updateLinks()
    }, [links, selected])
    const compile = () => {
        let changed
        let copy = [...nodes]
        do {
            updateLinks()
            changed = 0

            copy = copy.map(c => {
                let allValid = checkFields(c)
                const docNode = document.getElementById(c.id).parentNode
                const transformation = docNode.getAttribute('transform').replace('translate(', '').replace(')', '').split(' ')
                c.x = parseFloat(transformation[0])
                c.y = parseFloat(transformation[1])

                if (c instanceof Function && allValid) {
                    let oldResponse = c.response
                    c.execute()
                    if (c.response !== oldResponse)
                        changed += 1
                    return c
                }
                return c
            })

            console.log(changed)
        }
        while (changed > 0 || changed === undefined)

        setNodes(copy)
    }
    const [alert, setAlert] = useState({
        type: undefined,
        message: undefined
    })
    return {
        compile,
        selected, setSelected,
        setAlert,
        alert,
        setNodes,
        nodes,
        links,
        setLinks
    }
}