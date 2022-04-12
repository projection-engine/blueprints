import Node from "../../base/Node";
import {TYPES} from "../../base/TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/image/ImageProcessor";

export default class TextureSample extends Node {
    sample = {}
    uv = 1

    constructor() {
        super([
            {label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}
        ], [
            {label: 'Texture', type: TYPES.TEXTURE, key: 'sample'},
            {label: 'R', type: TYPES.TEXTURE, key: 'r', color: 'red'},
            {label: 'G', type: TYPES.TEXTURE, key: 'g', color: 'green'},
            {label: 'B', type: TYPES.TEXTURE, key: 'b', color: 'blue'},
        ]);
        this.name = 'Texture sample'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    compile(_, fileSystem, items) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            fileSystem.readRegistryFile(this.sample?.registryID)
                .then(res => {
                    if (res)
                        fileSystem.readFile(fileSystem.path + '\\assets\\' + res.path)
                            .then(file => {
                                items.forEach(i => {
                                    switch (i) {
                                        case 'r':
                                            ImageProcessor.byChannels([1, 0, 0, 1], file)
                                                .then(channel => {
                                                    this.r = channel

                                                    this.ready = true
                                                    resolve()
                                                })
                                            break
                                        case 'g':
                                            ImageProcessor.byChannels([0, 1, 0, 1], file)
                                                .then(channel => {
                                                    this.g = channel

                                                    this.ready = true
                                                    resolve()
                                                })
                                            break
                                        case 'b':
                                            ImageProcessor.byChannels([0, 0, 1, 1], file)
                                                .then(channel => {
                                                    this.b = channel
                                                    this.ready = true
                                                    resolve()

                                                })
                                            break
                                        default:

                                            this.sample = file
                                            this.ready = true
                                            resolve()
                                            break
                                    }
                                })
                            })
                    else {
                        this.sample = ''
                        this.ready = true
                        resolve()
                    }
                })
        })
    }
}

