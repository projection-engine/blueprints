import TextureSample from "../workflows/material/TextureSample";
import applyViewport from "./applyViewport";
import Material from "../workflows/material/Material";
import EVENTS from "../../../pages/project/utils/misc/EVENTS";
import Add from "../workflows/basic/Add";
import Multiply from "../workflows/basic/Multiply";
import Power from "../workflows/basic/Power";
import Numeric from "../workflows/basic/Numeric";
import Color from "../workflows/material/Color";
import ColorToTexture from "../workflows/material/ColorToTexture";

const INSTANCES = {

    Add: () => {
        return new Add()
    },
    Multiply: () => {
        return new Multiply()
    },
    Power: () => {
        return new Power()
    },
    Numeric: () => {
        return new Numeric()
    },

    Color: () => {
        return new Color()
    },
    ColorToTexture: () => {
        return new ColorToTexture()
    },
    TextureSample: () => {
        return new TextureSample()
    },
    Material: () => {
        return new Material()
    }
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

                                    if (o === 'sample' && i instanceof TextureSample) {
                                        i[o] = quickAccess.images.find(i => i.registryID === f[o].registryID)

                                    }
                                    else
                                        i[o] = f[o]
                                })
                                return i
                            })

                            applyViewport(file.response, engine, load)
                            setNodes(newNodes)
                            setLinks(file.links)
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        } else {
                            setNodes([new Material()])
                            load.finishEvent(EVENTS.LOADING_MATERIAL)
                        }
                    })
            } else
                load.finishEvent(EVENTS.LOADING_MATERIAL)
        })
}