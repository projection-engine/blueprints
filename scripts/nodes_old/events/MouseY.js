import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class MouseY extends Node {

    constructor() {
        super(
            [],
            [{label: 'Position', key: 'y', type: DATA_TYPES.NUMBER}],
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