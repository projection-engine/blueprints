import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";

export default class Subtract extends Node {
    value
    constructor( ) {
        super([
            {label: 'A', key: 'constA', accept: [TYPES.NUMBER]},
            {label: 'B', key: 'constB', accept: [TYPES.NUMBER]}
        ], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);


        this.name = 'Subtract'
    }

    compile([a, b], fileSystem) {
        return new Promise(resolve => {
            this.value = a - b
            this.ready = true
            resolve()
        })
    }
}