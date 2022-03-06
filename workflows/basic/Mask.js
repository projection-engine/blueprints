import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";

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

        return new Promise(resolve => {
            let image = items.find(i => i.key === 'sample')?.data
            if(image) {

                image = (image.includes('data:image/png') ? image : ImageProcessor.colorToImage(image))

                ImageProcessor.byChannels([...this.channel, 1], image)
                    .then(channel => {
                        console.log(channel, image)
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

