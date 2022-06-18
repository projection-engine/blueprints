import {useContext, useEffect, useState} from "react"
import useFlow from "./useFlow"
import Material from "../nodes/Material"
import TextureSample from "../nodes/TextureSample"
import getNewInstance from "../utils/getNewInstance"
import FileSystem from "../../../utils/files/FileSystem"
import GPUContextProvider from "../../viewport/hooks/GPUContextProvider"
import QuickAccessProvider from "../../../providers/QuickAccessProvider"


export default function useMaterialView(file) {
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
    const quickAccess = useContext(QuickAccessProvider)
    const {renderer} = useContext(GPUContextProvider)
    const [realTime, setRealTime] = useState(true)

    useEffect(() => {
        parse(file, (d) => {
            const found = d.find(dd => dd instanceof Material)

            if (found)
                setNodes(d)
            else
                setNodes([...d, new Material()])
        }, setLinks, quickAccess).catch()
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
        setSelected
    }
}

async function parse(file, setNodes, setLinks, quickAccess) {
    const res = await document.fileSystem.readRegistryFile(file.registryID)
    if (res) {
        const file = await document.fileSystem.readFile(document.fileSystem.path + FileSystem.sep + "assets" + FileSystem.sep + res.path, "json")
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
        } else
            setNodes([])

    } else
        setNodes([])

}