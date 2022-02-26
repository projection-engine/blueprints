import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class ParallaxOcclusionMapping extends Node {
    sample = ''
    uv = 1

    constructor() {
        super(
            [
                {label: 'Height Map', key: 'sample', accept: [TYPES.TEXTURE]},
                {label: 'Layers', key: 'layers', accept: [TYPES.NUMBER]},
                {label: 'Height Map channel', key: 'sample', accept: [TYPES.VEC]}
            ],
            [{label: 'Parallax object', type: TYPES.OBJECT, key: 'response'}]
        );
        this.name = 'Parallax Occlusion Mapping'
    }
    get type (){
        return NODE_TYPES.FUNCTION
    }
    compile([texture, layers, heightMapChannel]) {
        console.log(texture, layers, heightMapChannel)
        return new Promise(resolve => {
            // this.sample = ImageProcessor.colorToImage(color.data)
            this.ready = true

            resolve()
        })
    }
}


