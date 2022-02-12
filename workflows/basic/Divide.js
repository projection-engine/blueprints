import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import ImageProcessor, {COLOR_BLEND_OPERATIONS} from "../../../../services/workers/ImageProcessor";


export default class Divide extends Node {
    value

    constructor() {
        super([
            {label: 'A', key: 'texture', accept: [TYPES.TEXTURE]},
            {label: 'B', key: 'valueToMultiply', accept: [TYPES.NUMBER]}
        ], [{label: 'Texture', key: 'value', type: TYPES.TEXTURE}]);
        this.name = 'Divide'
    }

    compile(items, fileSystem) {
        return new Promise(resolve => {
            const image = items.find(i => i.key === 'texture')
            const value = parseFloat(items.find(i => i.key === 'valueToMultiply')?.data)

            if (image && value && !isNaN(value)) {
                ImageProcessor.blendWithColor(
                    1024,
                    1024,
                    image.data,
                `rgb(${1/value}, ${1/value}, ${1/value})`,
                    COLOR_BLEND_OPERATIONS.MULTIPLY
                )
                    .then(res => {
                        this.value = res
                        this.ready = true
                        resolve()
                    })
            } else {
                this.ready = true
                resolve()
            }
        })
    }
}