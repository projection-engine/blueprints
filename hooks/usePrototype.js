import {useContext, useEffect, useState} from "react";
import QuickAccessProvider from "../../../services/hooks/QuickAccessProvider";
import EVENTS from "../../../services/utils/misc/EVENTS";
import {LoaderProvider} from "@f-ui/core";
import useVisualizer from "../../../services/hooks/useVisualizer";
import parseMaterialFile from "../utils/parseMaterialFile";


export default function usePrototype(file) {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [changed, setChanged] = useState(false)

    const [selected, setSelected] = useState([])
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)
    const engine = useVisualizer(true, true, true, true)

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