import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class NumericSwitch extends Node {

    constructor() {
        super(
            [
                { key: 'line', accept: [TYPES.EXECUTION]},
                {label: 'Selection', key: 'selection', accept: [TYPES.NUMBER]}
            ],
            [
                {label: 'True', key: 'trueLine', type: TYPES.EXECUTION, showTitle: true},
                {label: 'False', key: 'falseLine', type: TYPES.EXECUTION, showTitle: true},
            ],
        );
        this.name = 'NumericSwitch'
        this.size = 1
        this.expandableInputs = true
    }
    expandInput(name){

    }

    get type() {
        return NODE_TYPES.BRANCH
    }

    static compile({
                       inputs,
                       object
                   }) {
        return inputs.condition ? object.trueLine : object.falseLine
    }
}