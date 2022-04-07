import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class Print extends Node {

    constructor() {
        super([
                {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
                {label: 'Data', key: 'data', accept: [TYPES.ANY], bundled: true, type: TYPES.STRING}
            ],
            [{label: 'Tick', key: 'tick', type: TYPES.EXECUTION}]);
        this.name = 'Print'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {data}, entities, attributes, nodeID, executors, setExecutors, renderTarget) {
        renderTarget.innerText = JSON.stringify(data !== undefined ? data : executors[nodeID].data)
        return attributes
    }
}