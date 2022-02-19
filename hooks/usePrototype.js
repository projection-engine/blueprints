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
import parseMaterialFile from "../utils/parseMaterialFile";



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
          parseMaterialFile(file, quickAccess, setNodes, setLinks, engine, load)
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