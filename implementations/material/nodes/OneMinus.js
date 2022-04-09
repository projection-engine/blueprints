import Node from "../../../flow/Node";
import {TYPES} from "../../../flow/TYPES";
import ImageProcessor from "../../../../../services/workers/image/ImageProcessor";
import NODE_TYPES from "../../../flow/NODE_TYPES";

export default class OneMinus extends Node {
    sampler0

    constructor() {
        super([
            {label: 'Texture', key: 'sampler0', accept: [TYPES.TEXTURE, TYPES.COLOR]},

        ], [{label: 'Texture', key: 'value', type: TYPES.TEXTURE}]);
        this.name = '1-X'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(items, fileSystem) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(async resolve => {
            let image = items.find(i => i.key === 'sampler0').data


            if (image) {
                image = (image.includes('data:image/png') ? image : await ImageProcessor.colorToImage(image))

                ImageProcessor.invert(image)
                    .then(res => {
                        this.ready = true
                        this.value = res
                        resolve()
                    })
            } else {
                this.ready = true
                resolve()
            }
        })
    }
}