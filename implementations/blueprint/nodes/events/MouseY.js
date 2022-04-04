import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";


export default class MouseY extends Node {

    constructor() {
        super(
            [],
            [{label: 'Position', key: 'y', type: TYPES.NUMBER}],
        );
        this.name = 'MouseY'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    static compile(tick, inputs, entities, attributes, nodeID, exec, setExec, rTarget, keys, {x, y}) {

        attributes[nodeID] = {}
        attributes[nodeID].y = y
        return attributes
    }
}