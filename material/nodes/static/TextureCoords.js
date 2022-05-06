import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class TextureCoords extends Node {
    texture = {}

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'texCoord', type: DATA_TYPES.VEC2}
        ]);

        this.name = 'TextureCoords'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ''
    }

    async    getInputInstance(index) {
        return ''
    }
    // texture and uv = {name: variable name, value: variable value if static}
    getFunctionCall() {
        this.texCoord = 'texCoord'
        return ''
    }
}