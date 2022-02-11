import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";

export default class ColorToTexture extends Node {
    sample = ''
    uv = 1

    constructor() {
        super(
            [
                {label: 'UV scale', key: 'uv', type: 'Constant', accept: [TYPES.NUMBER]},
                {label: 'Base color', key: 'blend', accept: [TYPES.COLOR]},
                {label: 'Base color', key: 'blend', type: TYPES.COLOR}
            ],
            [{label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}]
        );
        this.name = 'Texture sample'
    }
}

