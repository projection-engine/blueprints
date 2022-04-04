import TextureSample from "../nodes/TextureSample";
import applyViewport from "./applyViewport";
import Material from "../nodes/Material";
import EVENTS from "../../../../../services/utils/misc/EVENTS";
import Add from "../nodes/Add";
import Multiply from "../nodes/Multiply";
import Power from "../nodes/Power";
import Numeric from "../nodes/Numeric";
import Color from "../nodes/Color";

import ParallaxOcclusionMapping from "../nodes/ParallaxOcclusionMapping";
import Vector from "../nodes/Vector";
import Lerp from "../nodes/Lerp";
import Mask from "../nodes/Mask";
import OneMinus from "../nodes/OneMinus";
import HeightLerp from "../nodes/HeightLerp";

const INSTANCES = {
    Lerp: () => new Lerp(),
    Mask: () => new Mask(),
    OneMinus: () => new OneMinus(),
    HeightLerp: () => new HeightLerp(),

    Add: () => new Add(),
    Multiply: () => new Multiply(),
    Power: () => new Power(),
    Numeric: () => new Numeric(),
    Color: () => new Color(),
    TextureSample: () => new TextureSample(),
    Material: () => new Material(),
    Vector: () => new Vector(),
    ParallaxOcclusionMapping: () => new ParallaxOcclusionMapping()
}

export default function parseMaterialFile(file, quickAccess, setNodes, setLinks, engine, load) {
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
                                        if (o === 'sample' && i instanceof TextureSample)
                                            i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)
                                        else
                                            i[o] = f[o]
                                    }
                                })
                                return i
                            })
                            applyViewport(file.response, engine, load)
                            setNodes(newNodes)
                            setLinks(file.links)
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        } else {
                            applyViewport({}, engine, load)
                            setNodes([new Material()])
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        }
                    })
            } else
                load.finishEvent(EVENTS.LOADING_MATERIAL)
        })
}