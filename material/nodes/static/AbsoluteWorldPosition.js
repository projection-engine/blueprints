import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class AbsoluteWorldPosition extends Node {

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'vPosition', type: DATA_TYPES.VEC4}
        ]);

        this.name = 'AbsoluteWorldPosition'
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

    getFunctionCall( ) {
        this.vPosition = 'vPosition'
        return ''
    }
}