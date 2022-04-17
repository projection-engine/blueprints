import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class VertexCoords extends Node {

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'vPosition', type: DATA_TYPES.VEC4}
        ]);

        this.name = 'VertexCoords'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }
    getFunctionCall() {
        this.vPosition = 'vPosition'
        return ''
    }
}