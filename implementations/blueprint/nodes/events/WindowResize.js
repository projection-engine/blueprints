import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class WindowResize extends Node {

    constructor() {
        super(
            [],
            [
                {key: 'execute', type: TYPES.EXECUTION},
                {label: 'Width', key: 'w', type: TYPES.NUMBER},
                {label: 'Height', key: 'h', type: TYPES.NUMBER}
            ]);
        this.size = 1
        this.name = 'WindowResize'
    }

    get type() {
        return NODE_TYPES.START_POINT
    }

    static compile(
        inputs,
        object,
        nodeID,
        executors,
        keys,
        state,
        setState,
        metrics
    ) {
        if (state.width !== metrics.width || state.height !== metrics.height) {
            setState(metrics.width, 'width')
            setState(metrics.height, 'height')

            return object.execute
        }
        return []
    }
}