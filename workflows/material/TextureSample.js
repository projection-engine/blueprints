import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";

export default class TextureSample extends Node {
    sample = {}
    uv = 1
    constructor() {
        super([
            {label: 'UV scale', key: 'uv',   accept: [TYPES.NUMBER]},
            {label: 'Blend color', key: 'blend', accept: [TYPES.COLOR]},
            {label: 'Texture', type: TYPES.TEXTURE, key: 'sample' }
        ], [{label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}]);
        this.name = 'Texture sample'
    }
}

