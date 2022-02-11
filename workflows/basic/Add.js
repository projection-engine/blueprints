import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";

export default class Add extends Node {
    value
    constructor( ) {
        super([
            {label: 'A', key: 'constA', accept: [TYPES.NUMBER]},
            {label: 'B', key: 'constB', accept: [TYPES.NUMBER]}
        ], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);
        this.name = 'Add'
    }

    compile() {
        this.value = this.constA + this.constB
    }
}