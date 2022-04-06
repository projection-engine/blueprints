import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class Delay extends Node {

    constructor() {
        super(
            [
                {key: 'line', accept: [TYPES.EXECUTION]},
            ],
            [
                {key: 'lineEnd', type: TYPES.EXECUTION},
            ],
        );
        this.name = 'Delay'
    }

    get type() {
        return NODE_TYPES.BRANCH
    }

    static compile({c}, obj) {
        return c ? obj.branch1 : obj.branch0
    }
}