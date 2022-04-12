import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class Branch extends Node {

    constructor() {
        super(
            [
                {label: 'A', key: 'line', accept: [TYPES.EXECUTION]},
                {label: 'Condition', key: 'condition', accept: [TYPES.BOOL]}
            ],
            [
                {label: 'True', key: 'trueLine', type: TYPES.EXECUTION, showTitle: true},
                {label: 'False', key: 'falseLine', type: TYPES.EXECUTION, showTitle: true},
            ],
        );
        this.name = 'Branch'
        this.size = 2
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