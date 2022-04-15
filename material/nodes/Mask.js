import Node from "../../base/Node";
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/image/ImageProcessor";

export default class Mask extends Node {
    sample = {}
    channel = [0, 0, 0]

    constructor() {
        super([
            {label: 'Texture', key: 'sample', accept: [DATA_TYPES.TEXTURE, DATA_TYPES.COLOR]},
            {label: 'Color channel', key: 'channel', type: DATA_TYPES.VEC, max: 1, min: 0}
        ], [
            {label: 'Channel', type: DATA_TYPES.TEXTURE, key: 'result'}
        ]);
        this.name = 'Mask'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items) {
        if(this.ready)
            return new Promise(r => r())

        return new Promise(async resolve => {
            let image = items.find(i => i.key === 'sample')?.data
            if(image) {

                image = (image.includes('data:image/png') ? image : await ImageProcessor.colorToImage(image))

                ImageProcessor.byChannels([...this.channel, 1], image)
                    .then(channel => {

                        this.result = channel
                        this.ready = true
                        resolve()
                    })
            }
            else
                resolve()
        })
    }
}

