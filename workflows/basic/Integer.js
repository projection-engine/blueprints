import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";

export default class Integer extends Node {
    value
    constructor() {
        super([{label: 'Value', key: 'value', type: TYPES.NUMBER}], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);

        this.name = 'Constant'
    }

}