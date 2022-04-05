import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {KEYS} from "../../../../../../services/hooks/useHotKeys";


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

    static compile(_, obj, nodeID, executors, keys, state = {}, setState, {width, height}) {
        if (state.width !== width || state.height !== height) {
            setState(width, 'width')
            setState(height, 'height')

            return obj.branch0
        }
        return []
    }
}