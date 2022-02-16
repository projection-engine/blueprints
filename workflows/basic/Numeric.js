import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class Numeric extends Node {
    constructor(value = 0.0) {
        super([{label: 'Value', key: 'value', type: TYPES.NUMBER}], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);
        this.value = value
        this.name = 'Number'
    }
    get type (){
        return NODE_TYPES.DATA
    }
    compile( ) {
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}