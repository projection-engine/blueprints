import Node from "../../../base/Node";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class MouseX extends Node {

    constructor() {
        super(
            [],
            [{label: 'Position', key: 'x', type: TYPES.NUMBER}],
        );
        this.name = 'MouseX'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    static compile(tick, inputs, entities, attributes, nodeID, exec, setExec, rTarget, keys, {x, y}) {

        attributes[nodeID] = {}
        attributes[nodeID].x = x

        return attributes
    }
}