import Node from "../../../flow/Node";
import {TYPES} from "../../../flow/TYPES";
import NODE_TYPES from "../../../flow/NODE_TYPES";
import ImageProcessor from "../../../../../services/workers/image/ImageProcessor";

export default class Mask extends Node {
    sample = {}
    channel = [0, 0, 0]

    constructor() {
        super([
            {label: 'Texture', key: 'sample', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Color channel', key: 'channel', type: TYPES.VEC, max: 1, min: 0}
        ], [
            {label: 'Channel', type: TYPES.TEXTURE, key: 'result'}
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

