import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class EventTick extends Node {
    tick = 0
    canBeDeleted = true
    constructor() {
        super([], [{label: 'Tick', key: 'execute', type: TYPES.EXECUTION}]);
        this.name = 'EventTick'
        this.size = 2
    }

    get type (){
        return NODE_TYPES.START_POINT
    }
    static compile({object}) {
        return object.execute
    }
}