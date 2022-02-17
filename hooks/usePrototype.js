import {useContext, useEffect, useState} from "react";

import Material from "../workflows/material/Material";
import QuickAccessProvider from "../../../services/hooks/QuickAccessProvider";
import EVENTS from "../../../pages/project/utils/misc/EVENTS";
import {LoaderProvider} from "@f-ui/core";


import Add from "../workflows/basic/Add";
import Multiply from "../workflows/basic/Multiply";
import Color from "../workflows/material/Color";
import Power from "../workflows/basic/Power";
import TextureSample from "../workflows/material/TextureSample";
import Numeric from "../workflows/basic/Numeric";
import compile from "../utils/compile";
import applyViewport from "../utils/applyViewport";
import useVisualizer from "../../../services/hooks/useVisualizer";
import ColorToTexture from "../workflows/material/ColorToTexture";

const INSTANCES = {

    Add: () => {return new Add()},
    Multiply: () => {return new Multiply()},
    Power: () => {return new Power()},
    Numeric: () => {return new Numeric()},

    Color: () => {return new Color()},
    ColorToTexture: () => {return new ColorToTexture()},
    TextureSample: () => {return new TextureSample()},
    Material: () => {return new Material()}
}

export default function usePrototype(file) {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [changed, setChanged] = useState(false)

    const [selected, setSelected] = useState([])
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)
    const engine = useVisualizer(true, true, true)

    useEffect(() => {
        load.pushEvent(EVENTS.LOADING_MATERIAL)
        if(engine.gpu && engine.meshes.length > 0){
            quickAccess.fileSystem
                .readRegistryFile(file.registryID)
                .then(res => {
                    if (res) {
                        quickAccess.fileSystem
                            .readFile(quickAccess.fileSystem.path + '\\assets\\' + res.path, 'json')
                            .then(file => {

                                if (file && Object.keys(file).length > 0) {
                                    const newNodes = file.nodes.map(f => {
                                        const i = INSTANCES[f.instance]()
                                        Object.keys(f).forEach(o => {
                                            if(o === 'sample' && i instanceof TextureSample)
                                                i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                                                else
                                            i[o] = f[o]
                                        })
                                        return i
                                    })

                                    compile(load, newNodes, file.links, quickAccess.fileSystem)
                                        .then(res => {
                                            applyViewport(res, engine, load)
                                            setNodes(newNodes)
                                            setLinks(file.links)
                                        })
                                }
                                else {
                                    setNodes([new Material()])
                                    load.finishEvent(EVENTS.LOADING_MATERIAL)
                                }
                            })
                    }
                    else
                        load.finishEvent(EVENTS.LOADING_MATERIAL)
                })
        }

    }, [file, engine.gpu,engine.meshes])


    return {
        engine,
        selected,
        setSelected,
        setNodes,
        nodes,
        links,
        setLinks,
        quickAccess,
        load,
        changed, setChanged
    }
}