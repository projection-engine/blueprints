import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";

export default class HeightLerp extends Node {
    sample = {}
    sample1 = {}
    factor = 1

    constructor() {
        super([
            {label: 'Texture 0', key: 'sample', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Texture 1', key: 'sample1', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Height map', key: 'sample2', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Threshold', key: 'factor', accept: [TYPES.NUMBER]},
        ], [
            {label: 'Texture', type: TYPES.TEXTURE, key: 'result'}
        ]);
        this.name = 'Height Lerp'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items) {
        return new Promise(resolve => {
            let image0 = items.find(i => i.key === 'sample')?.data,
                image1 = items.find(i => i.key === 'sample1')?.data,
                heightMap = items.find(i => i.key === 'sample2')?.data,
                factor = items.find(i => i.key === 'factor')?.data

            if(image0 && image1) {
                image0 = (image0.includes('data:image/png') ? image0 : ImageProcessor.colorToImage(image0))
                image1 = (image1.includes('data:image/png') ? image1 : ImageProcessor.colorToImage(image1))
                heightMap = (heightMap.includes('data:image/png') ? heightMap : ImageProcessor.colorToImage(heightMap))

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

