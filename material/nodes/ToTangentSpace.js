import Node from '../../components/Node'
import {DATA_TYPES} from "../../components/DATA_TYPES";
import NODE_TYPES from "../../components/NODE_TYPES";


export default class ToTangentSpace extends Node {

    constructor() {
        super([], [
            {label: 'Matrix', key: 'toTangentSpace', type: DATA_TYPES.MAT3}
        ]);

        this.name = 'ToTangentSpace'
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
        this.toTangentSpace = 'toTangentSpace'
        return ''
    }
}