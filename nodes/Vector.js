import Node from '../../../components/flow/Node'
import {TYPES} from "../../../components/flow/TYPES";
import NODE_TYPES from "../../../components/flow/NODE_TYPES";

export default class Vector extends Node {
    constructor() {
        super(
            [{label: 'Value', key: 'value', type: TYPES.VEC}],
            [{label: 'Value', key: 'value', type: TYPES.VEC}]);
        this.value = [0,0,0]
        this.name = 'Vector3'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    compile() {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}