import {useContext, useEffect, useState} from "react";
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider";
import EVENTS from "../../../../utils/EVENTS";
import useMinimalEngine from "../../../../engine-editor/useMinimalEngine";
import useFlow from "../../components/hooks/useFlow";
import Material from "../nodes/Material";
import TextureSample from "../nodes/TextureSample";
import LoaderProvider from "../../../../../components/loader/LoaderProvider";
import getNewInstance from "../utils/getNewInstance";


export default function useMaterialView(file,setAlert) {
    const {
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected,
        impactingChange, setImpactingChange,
    } = useFlow()

    const [realTime, setRealTime] = useState(true)
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)
    const engine = useMinimalEngine(true, true, true, true)

    useEffect(() => {
        load.pushEvent(EVENTS.LOADING_MATERIAL)
        if (engine.gpu && engine.meshes.length > 0)
            parse(file, quickAccess, setNodes, setLinks, engine, load)

    }, [file, engine.gpu, engine.meshes])


    return {
        realTime, setRealTime,
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

function parse(file, quickAccess, setNodes, setLinks, engine, load) {
    quickAccess.fileSystem
        .readRegistryFile(file.registryID)
        .then(res => {
            if (res) {
                quickAccess.fileSystem
                    .readFile(quickAccess.fileSystem.path + '\\assets\\' + res.path, 'json')
                    .then(file => {
                        if (file && Object.keys(file).length > 0) {
                            const newNodes = file.nodes.map(f => {
                                const i = getNewInstance(f.instance)
                                if(i)
                                    Object.keys(f).forEach(o => {
                                        if(o !== 'inputs' && o !== 'output') {
                                            if (o === 'texture' && i instanceof TextureSample)
                                                i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                                            else
                                                i[o] = f[o]
                                        }
                                    })
                                return i
                            }).filter(e => e !== null && e !== undefined)
                            // applyViewport(file.response, engine, setAlert)
                            setNodes(newNodes)
                            setLinks(file.links)

                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        } else {
                            // applyViewport({}, engine, setAlert)
                            setNodes([new Material()])
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        }
                    })
            } else
                load.finishEvent(EVENTS.LOADING_MATERIAL)
        })
}