import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class OnInterval extends Node {
    interval = 1000
    constructor() {
        super(
            [
                {label: 'Interval', key: 'interval', type: TYPES.NUMBER, bundled: true, precision: 0}
            ],
            [
                {key: 'execute', type: TYPES.EXECUTION},
            ],
        );
        this.name = 'OnInterval'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.START_POINT
    }

    static compile({inputs, state, setState, object, executors, nodeID}) {

        if (!state.timeoutSet) {
            setState(true, 'timeoutSet')

            setInterval(() => setState(true, 'canContinue'), [executors[nodeID].interval])
        }
        if (state.canContinue) {
            console.log('EVERY ', executors[nodeID].interval)
            setState(false, 'canContinue')
            return object.execute
        }

        return []
    }
}