import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class OnSpawn extends Node {

    constructor() {
        super(
            [],
            [
                {key: 'execute', type: TYPES.EXECUTION}
            ]);
        this.size = 1
        this.name = 'OnSpawn'
    }

    get type() {
        return NODE_TYPES.START_POINT
    }

    static compile({
                       state,
                       setState,
        object
                   }) {
        if (!state.wasExecuted) {
            setState(true, 'wasExecuted')
            return object.execute
        }
        return []
    }
}