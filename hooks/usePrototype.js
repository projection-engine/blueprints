import {useContext, useEffect, useLayoutEffect, useState} from "react";
import parseNodes from "../utils/parseNodes";

import Material from "../workflows/material/Material";
import QuickAccessProvider from "../../../pages/project/hook/QuickAccessProvider";
import cloneClass from "../../../pages/project/utils/misc/cloneClass";
import ImageProcessor from "../../../services/workers/ImageProcessor";
import logo from "../../../static/LOGO.png";
import EVENTS from "../../../pages/project/utils/misc/EVENTS";
import LoadProvider from "../../../pages/project/hook/LoadProvider";


export default function usePrototype(registryID) {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [selected, setSelected] = useState()
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoadProvider)


    useLayoutEffect(() => {
        quickAccess.fileSystem
            .readRegistryFile(registryID)
            .then(res => {
                if (res) {
                    quickAccess.fileSystem
                        .readFile(quickAccess.fileSystem.path + '\\assets\\' + res.path, 'json')
                        .then(file => {
                            if (file) {
                                parseNodes( file.nodes, file.response, file.workflow, (parsed) => {
                                    let n = [...parsed]
                                    if (parsed.length === 0)
                                        n.push(new Material())

                                    setNodes(n)
                                    if (file.links !== undefined)
                                        setLinks(file.links)
                                }, quickAccess)
                            }
                        })
                }
            })

    }, [registryID])


    const compile = () => {
        load.pushEvent(EVENTS.COMPILING)

        const newNodes = nodes.map(
            c => {
                const docNode = document.getElementById(c.id).parentNode
                const transformation = docNode
                    .getAttribute('transform')
                    .replace('translate(', '')
                    .replace(')', '')
                    .split(' ')

                c.x = parseFloat(transformation[0])
                c.y = parseFloat(transformation[1])

                return c
            })
        // Brightness = value * r, g, b
        // Blend = r / g / b
        //
        // ImageProcessor.blendWithColor(1024, 1024, logo, [1.5, 1.5, 1.5, 1])
        //     .then(res => {
        //
        //         setT(res)
        //     })
        setNodes(newNodes)

        return newNodes
    }

    return {
        compile,
        selected,
        setSelected,
        setNodes,
        nodes,
        links,
        setLinks,
        quickAccess
    }
}