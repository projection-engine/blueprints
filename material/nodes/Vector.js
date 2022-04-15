import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";

export default class Vector extends Node {
    constructor() {
        super(
            [{label: 'Value', key: 'value', type: DATA_TYPES.VEC}],
            [{label: 'Value', key: 'value', type: DATA_TYPES.VEC}]);
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