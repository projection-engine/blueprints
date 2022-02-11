import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";


export default class Divide extends Node {
    response

    constructor( ) {
        super([
            {label: 'A', key: 'constA', accept: [TYPES.NUMBER]},
            {label: 'B', key: 'constB', accept: [TYPES.NUMBER]}
        ], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);
        this.name = 'Divide'
    }

    execute() {
        this.response = this.constA / this.constB
    }
}