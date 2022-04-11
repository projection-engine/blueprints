import Node from "../../../../flow/Node";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

const toDeg = 57.29
export default class GetCameraPosition extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
            {label: 'X', key: 'x', type: TYPES.NUMBER},
            {label: 'Y', key: 'y', type: TYPES.NUMBER},
            {label: 'Z', key: 'z', type: TYPES.NUMBER},
        ]);
        this.name = 'GetCameraPosition'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {cameraRoot}, entities, attributes, nodeID) {


        attributes[nodeID] = {}
        attributes[nodeID].x = cameraRoot.position[0]
        attributes[nodeID].y = cameraRoot.position[1]
        attributes[nodeID].z = cameraRoot.position[2]

        return attributes
    }
}