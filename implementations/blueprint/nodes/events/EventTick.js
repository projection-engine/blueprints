import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class EventTick extends Node {
    tick = 0
    canBeDeleted = true
    constructor() {
        super([], [{label: 'Tick', key: 'tick', type: TYPES.EXECUTION}]);
        this.name = 'EventTick'
    }

    get type (){
        return NODE_TYPES.START_POINT
    }
    static compile(tick, inputs, entities, a, nodeID) {
        return a
    }
}