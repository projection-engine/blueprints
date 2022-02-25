import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";

export default class SpecularToMetallic extends Node {
    sample = ''
    specularMap

    constructor() {
        super([
            {label: 'Specular', key: 'specularMap', accept: [TYPES.TEXTURE]}
        ], [
            {label: 'Metallic', type: TYPES.TEXTURE, key: 'sample'},
        ]);
        this.name = 'Specular to metallic'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile([texture], fileSystem) {

        return new Promise(resolve => {
            if (texture) {
                this.sample = texture.data
                ImageProcessor.specularToMetallic(texture.data)
                this.ready = true
                resolve()
            }
        else
            resolve()
        })
    }
}

