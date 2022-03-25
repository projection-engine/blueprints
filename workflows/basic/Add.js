import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import ImageProcessor, {COLOR_BLEND_OPERATIONS} from "../../../../services/workers/ImageProcessor";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class Add extends Node {
    value

    constructor() {
        super([
            {label: 'Texture', key: 'texture', accept: [TYPES.TEXTURE]},
            {label: 'Value', key: 'valueToMultiply', accept: [TYPES.COLOR, TYPES.NUMBER]}
        ], [{label: 'Texture', key: 'value', type: TYPES.TEXTURE}]);
        this.name = 'Add'
    }
    get type (){
        return NODE_TYPES.FUNCTION
    }
    compile(items, fileSystem) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            const image = items.find(i => i.key === 'texture')
            const color = items.find(i => i.key === 'valueToMultiply')

            if (image && color) {
                const isNumber = !isNaN(parseFloat(color.data))
                ImageProcessor.blendWithColor(
                    image.data,
                    !isNumber? color.data : `rgb(${color.data}, ${color.data}, ${color.data})`,
                    COLOR_BLEND_OPERATIONS.ADD
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