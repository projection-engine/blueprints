import {useContext, useEffect} from "react";
import QuickAccessProvider from "../../../../services/hooks/QuickAccessProvider";
import EVENTS from "../../../../services/utils/misc/EVENTS";
import {LoaderProvider} from "@f-ui/core";
import useMinimalEngine from "../../../../services/hooks/useMinimalEngine";
import parseMaterialFile from "../../material/utils/parseMaterialFile";
import useFlow from "../../base/hooks/useFlow";
import Material from "../nodes/Material";
import TextureSample from "../nodes/TextureSample";
import Add from "../nodes/Add";
import TextureCoord from "../nodes/TextureCoord";
import Float from "../nodes/Float";


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
            parse(file, quickAccess, setNodes, setLinks, engine, load, setAlert)

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


const INSTANCES = {
    [Material.name]: () => new Material(),

    [Add.name]: () => new Add(),
    [TextureSample.name]: () => new TextureSample(),
    [TextureCoord.name]: () => new TextureCoord(),
    [Float.name]: () => new Float()
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
                                const i = INSTANCES[f.instance]()
                                Object.keys(f).forEach(o => {
                                    if(o !== 'inputs' && o !== 'output') {
                                        if (o === 'texture' && i instanceof TextureSample)
                                            i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                                        else
                                            i[o] = f[o]
                                    }
                                })
                                return i
                            })
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