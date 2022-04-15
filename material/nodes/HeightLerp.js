import Node from "../../base/Node";
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/image/ImageProcessor";

export default class HeightLerp extends Node {
    sample = {}
    sample1 = {}
    factor = 1

    constructor() {
        super([
            {label: 'Texture 0', key: 'sample', accept: [DATA_TYPES.TEXTURE, DATA_TYPES.COLOR]},
            {label: 'Texture 1', key: 'sample1', accept: [DATA_TYPES.TEXTURE, DATA_TYPES.COLOR]},
            {label: 'Height map', key: 'sample2', accept: [DATA_TYPES.TEXTURE, DATA_TYPES.COLOR]},
            {label: 'Threshold', key: 'factor', accept: [DATA_TYPES.NUMBER]},
        ], [
            {label: 'Texture', type: DATA_TYPES.TEXTURE, key: 'result'}
        ]);
        this.name = 'Height Lerp'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items) {
        if(this.ready)
            return new Promise(r => r())

        return new Promise(async resolve => {
            let image0 = items.find(i => i.key === 'sample')?.data,
                image1 = items.find(i => i.key === 'sample1')?.data,
                heightMap = items.find(i => i.key === 'sample2')?.data,
                factor = items.find(i => i.key === 'factor')?.data

            if(image0 && image1) {
                image0 = (image0.includes('data:image/png') ? image0 : await ImageProcessor.colorToImage(image0))
                image1 = (image1.includes('data:image/png') ? image1 : await ImageProcessor.colorToImage(image1))
                heightMap = (heightMap.includes('data:image/png') ? heightMap :await  ImageProcessor.colorToImage(heightMap))

                ImageProcessor.heightBasedLinearInterpolate(image0, image1, heightMap, parseFloat(factor !== undefined ? factor : this.factor))
                    .then(result => {
                        this.result = result
                        this.ready = true
                        resolve()
                    })
            }
            else
                resolve()
        })
    }
}

