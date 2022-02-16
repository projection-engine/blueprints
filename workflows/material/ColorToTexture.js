import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class ColorToTexture extends Node {
    sample = ''
    uv = 1

    constructor() {
        super(
            [
                {label: 'UV scale', key: 'uv', type: 'Constant', accept: [TYPES.NUMBER]},
                {label: 'Base color', key: 'color', accept: [TYPES.COLOR]}
            ],
            [{label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}]
        );
        this.name = 'Color to texture'
    }
    get type (){
        return NODE_TYPES.FUNCTION
    }
    compile([color]) {
        return new Promise(resolve => {
            this.sample = ImageProcessor.colorToImage(color.data)
            this.ready = true

            resolve()
        })
    }
}


