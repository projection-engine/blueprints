import {useContext, useEffect, useState} from "react"
import useFlow from "./useFlow"
import Material from "../nodes/Material"
import TextureSample from "../nodes/TextureSample"
import getNewInstance from "../utils/getNewInstance"
import FileSystem from "../../../utils/files/FileSystem"
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
    const [status, setStatus] = useState({})
    const [scale, setScale] = useState(1)
    const [realTime, setRealTime] = useState(1)

    const {images} = useContext(QuickAccessProvider)

    useEffect(() => {
        parse(file, (d) => {
            const found = d.find(dd => dd instanceof Material)

            if (found)
                setNodes(d)
            else
                setNodes([...d, new Material()])
        }, setLinks, images).catch()
    }, [file])

    return {
        realTime, setRealTime,
        scale, setScale,
        status, setStatus,
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

async function parse(file, setNodes, setLinks, images) {
    const res = await window.fileSystem.readRegistryFile(file.registryID)
    if (res) {
        const file = await window.fileSystem.readFile(window.fileSystem.path + FileSystem.sep + "assets" + FileSystem.sep + res.path, "json")
        if (file && Object.keys(file).length > 0) {
            const newNodes = file.nodes.map(f => {
                const i = getNewInstance(f.instance)
                if (i) Object.keys(f).forEach(o => {
                    if (o !== "inputs" && o !== "output") {
                        if (o === "texture" && i instanceof TextureSample) i[o] = images.find(i => i.registryID === f[o].registryID)
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