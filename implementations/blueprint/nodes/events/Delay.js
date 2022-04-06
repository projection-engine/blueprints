import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class Delay extends Node {

    constructor() {
        super(
            [
                {key: 'line', accept: [TYPES.EXECUTION]},
                {label: 'Delay', key: 'delay', accept: [TYPES.NUMBER]},
                {label: 'Reset', key: 'reset', accept: [TYPES.BOOL]},
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

    static compile({inputs, state, setState, object}) {
        if (inputs.reset) {
            clearTimeout(state.timeout)
            setState(false, 'timeoutSet')
            setState(false, 'canContinue')
        }
        if (!state.canContinue && !state.timeoutSet) {
            setState(true, 'timeoutSet')
            setState(setTimeout(() => setState(true, 'canContinue'), [inputs.delay]), 'timeout')
        } else if (state.canContinue)
            return object.branch0

        return []
    }
}