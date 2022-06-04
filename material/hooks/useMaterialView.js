import {useContext, useEffect, useState} from "react"
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider"
import EVENTS from "../../../../templates/EVENTS"
import useFlow from "../../components/hooks/useFlow"
import Material from "../utils/nodes/Material"
import TextureSample from "../utils/nodes/TextureSample"
import LoaderProvider from "../../../../../components/loader/LoaderProvider"
import getNewInstance from "../utils/getNewInstance"
import FileSystem from "../../../../utils/files/FileSystem"
import GPUContextProvider from "../../../viewport/hooks/GPUContextProvider"


export default function useMaterialView(file, setAlert) {
    const {
        nodes,
        setNodes,
        links,
        setLinks,
        groups,
        setGroups,
        changed,
        setChanged,
        selected,
        setSelected,
        impactingChange,
        setImpactingChange,
    } = useFlow()

    const {renderer} = useContext(GPUContextProvider)
    const [realTime, setRealTime] = useState(true)
    const quickAccess = useContext(QuickAccessProvider)
    const load = useContext(LoaderProvider)

    useEffect(() => {
        parse(file, quickAccess, (d) => {
            const found = d.find(dd => dd instanceof Material)

            if (found)
                setNodes(d)
            else
                setNodes([...d, new Material()])
        }, setLinks, load).catch()
    }, [])

    return {
        renderer,
        realTime,
        setRealTime,
        impactingChange,
        setImpactingChange,
        nodes,
        setNodes,
        links,
        setLinks,
        groups,
        setGroups,
        changed,
        setChanged,
        selected,
        setSelected,
        quickAccess,
        load,
        setAlert
    }
}

async function parse(file, quickAccess, setNodes, setLinks, load) {
    const res = await quickAccess.fileSystem.readRegistryFile(file.registryID)
    if (res) {
        const file = await quickAccess.fileSystem.readFile(quickAccess.fileSystem.path + FileSystem.sep + "assets" + FileSystem.sep + res.path, "json")
        if (file && Object.keys(file).length > 0) {
            const newNodes = file.nodes.map(f => {
                const i = getNewInstance(f.instance)
                if (i) Object.keys(f).forEach(o => {
                    if (o !== "inputs" && o !== "output") {
                        if (o === "texture" && i instanceof TextureSample) i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                        else i[o] = f[o]
                    }
                })
                return i
            }).filter(e => e !== null && e !== undefined)
            setNodes(newNodes)
            setLinks(file.links)

            load.finishEvent(EVENTS.LOADING_MATERIAL)
        } else {
            setNodes([])
            load.finishEvent(EVENTS.LOADING_MATERIAL)
        }
    } else {
        setNodes([])
        load.finishEvent(EVENTS.LOADING_MATERIAL)
    }

}