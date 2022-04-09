import Node from "../../../flow/Node";
import {TYPES} from "../../../flow/TYPES";
import NODE_TYPES from "../../../flow/NODE_TYPES";
import ImageProcessor from "../../../../../services/workers/image/ImageProcessor";

export default class Lerp extends Node {
    sample = {}
    sample1 = {}
    factor = 1

    constructor() {
        super([
            {label: 'Texture 0', key: 'sample', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Texture 1', key: 'sample1', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Factor', key: 'factor', accept: [TYPES.NUMBER]},
        ], [
            {label: 'Channel', type: TYPES.TEXTURE, key: 'result'}
        ]);
        this.name = 'Lerp'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items) {
        if (this.ready)
            return new Promise(r => r())
        return new Promise(async resolve => {
            let image0 = items.find(i => i.key === 'sample')?.data,
                image1 = items.find(i => i.key === 'sample1')?.data,
                factor = items.find(i => i.key === 'factor')?.data

            if (image0 && image1) {
                image0 = (image0.includes('data:image/png') ? image0 : await ImageProcessor.colorToImage(image0))
                image1 = (image1.includes('data:image/png') ? image1 : await ImageProcessor.colorToImage(image1))

                ImageProcessor.linearInterpolate(image0, image1, parseFloat(factor !== undefined ? factor : this.factor))
                    .then(result => {
                        this.factor = factor
                        this.result = result
                        this.ready = true
                        resolve()
                    })
            } else
                resolve()
        })
    }
}

