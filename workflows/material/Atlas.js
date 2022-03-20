import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";

export default class Atlas extends Node {
    sample = {}
    sample1 = {}
    factor = 1
    percentageValues = [.33, .33, .33]

    constructor() {
        super([
            {label: 'Layer 0', key: 'sample0', accept: [TYPES.TEXTURE, TYPES.COLOR]},
            {label: 'Layer 1', key: 'sample1', accept: [TYPES.TEXTURE, TYPES.COLOR], disable: true},
            {label: 'Layer 2', key: 'sample2', accept: [TYPES.TEXTURE, TYPES.COLOR], disable: true},
            {label: 'Percentage', key: 'percentage', accept: [TYPES.TEXTURE, TYPES.COLOR], disable: true},
        ], [
            {label: 'Atlas', type: TYPES.ATLAS, key: 'result'}
        ]);
        this.name = 'Atlas layer blend'
    }

    get percentage(){
        return this.percentageValues.map(e => Math.round(e *3))
    }
    set percentage(data){
        this.percentageValues = data.map(d => d/3)
    }
    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            let image0 = items.find(i => i.key === 'sample0')?.data,
                image1 = items.find(i => i.key === 'sample1')?.data,
                image2 = items.find(i => i.key === 'sample2')?.data

            if (image0 !== undefined)
                image0 = (image0.includes('data:image/png') ? image0 : ImageProcessor.colorToImage(image0))
            if (image1 !== undefined)
                image1 = (image1.includes('data:image/png') ? image1 : ImageProcessor.colorToImage(image1))
            if (image2 !== undefined)
                image2 = (image2.includes('data:image/png') ? image2 : ImageProcessor.colorToImage(image2))

            this.result = {
                sampler0: image0,
                sampler1: image1,
                sampler2: image2,
                percentage: this.percentageValues
            }
            this.ready = true
            resolve()

        })
    }
}

