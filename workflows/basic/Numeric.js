import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";

export default class Numeric extends Node {
    constructor(value = 0.0) {
        super([{label: 'Value', key: 'value', type: TYPES.NUMBER}], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);
        this.value = value
        this.name = 'Number'
    }

    compile( ) {
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}