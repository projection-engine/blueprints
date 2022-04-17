import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class ElapsedTime extends Node {

    constructor() {
        super([], [
            {label: 'Elapsed', key: 'elapsedTime', type: DATA_TYPES.FLOAT}
        ]);

        this.name = 'ElapsedTime'
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
        this.elapsedTime = 'elapsedTime'
        return ''
    }
}