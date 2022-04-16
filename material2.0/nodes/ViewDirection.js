import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class ViewDirection extends Node {

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'viewDirection', type: DATA_TYPES.VEC3}
        ]);

        this.name = 'ViewDirection'
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
        this.viewDirection = 'viewDirection'
        return ''
    }
}