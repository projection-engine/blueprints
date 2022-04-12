import {useContext, useEffect} from "react";
import QuickAccessProvider from "../../../../services/hooks/QuickAccessProvider";
import EVENTS from "../../../../services/utils/misc/EVENTS";
import {LoaderProvider} from "@f-ui/core";
import useMinimalEngine from "../../../../services/hooks/useMinimalEngine";
import parseMaterialFile from "../utils/parseMaterialFile";
import useFlow from "../../base/hooks/useFlow";


export default function useMaterialView(file,setAlert) {
    const {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,
    } = useFlow()
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)
    const engine = useMinimalEngine(true, true, true, true)

    useEffect(() => {
        load.pushEvent(EVENTS.LOADING_MATERIAL)
        if (engine.gpu && engine.meshes.length > 0)
            parseMaterialFile(file, quickAccess, setNodes, setLinks, engine, load, setAlert)

    }, [file, engine.gpu, engine.meshes])


    return {
        impactingChange, setImpactingChange,
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        engine, quickAccess, load,
        setAlert
    }
}