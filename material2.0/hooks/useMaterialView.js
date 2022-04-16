import {useContext, useEffect, useState} from "react";
import QuickAccessProvider from "../../../../services/hooks/QuickAccessProvider";
import EVENTS from "../../../../services/utils/misc/EVENTS";
import {LoaderProvider} from "@f-ui/core";
import useMinimalEngine from "../../../../services/hooks/useMinimalEngine";
import parseMaterialFile from "../../material/utils/parseMaterialFile";
import useFlow from "../../base/hooks/useFlow";
import Material from "../nodes/Material";
import TextureSample from "../nodes/TextureSample";
import Add from "../nodes/Add";
import TextureCoords from "../nodes/TextureCoords";
import Float from "../nodes/Float";
import Divide from "../nodes/Divide";
import Sin from "../nodes/Sin";
import NormalVector from "../nodes/NormalVector";
import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import RGB from "../nodes/RGB";
import ToTangentSpace from "../nodes/ToTangentSpace";
import VertexCoords from "../nodes/VertexCoords";
import ViewDirection from "../nodes/ViewDirection";
import CameraCoords from "../nodes/CameraCoords";
import ElapsedTime from "../nodes/ElapsedTime";
import Multiply from "../nodes/Multiply";
import PerlinNoise from "../nodes/PerlinNoise";


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
            parse(file, quickAccess, setNodes, setLinks, engine, load, setAlert)

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


const INSTANCES = {
    [Material.name]: () => new Material(),

    [Add.name]: () => new Add(),
    [TextureSample.name]: () => new TextureSample(),
    [TextureCoords.name]: () => new TextureCoords(),
    [Float.name]: () => new Float(),

    [Divide.name]: () => new Divide(),
    [Sin.name]: () => new Sin(),
    [NormalVector.name]: () => new NormalVector(),
    [ParallaxOcclusionMapping.name]: () => new ParallaxOcclusionMapping(),
    [RGB.name]: () => new RGB(),
    [ToTangentSpace.name]: () => new ToTangentSpace(),
    [VertexCoords.name]: () => new VertexCoords(),
    [ViewDirection.name]: () => new ViewDirection(),

    [CameraCoords.name]: () => new CameraCoords(),
    [ElapsedTime.name]: () => new ElapsedTime(),
    [Multiply.name]: () => new Multiply(),
    [PerlinNoise.name]: () => new PerlinNoise(),
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