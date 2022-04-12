import Node from "../../../base/Node";
import NODE_TYPES from "../../../base/NODE_TYPES";
import {TYPES} from "../../../base/TYPES";

const toDeg = 57.29
export default class GetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
            {label: 'Rotation', key: 'rot', type: TYPES.VEC4},

        ]);
        this.name = 'GetCameraRotation'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {cameraRoot}, entities, attributes, nodeID) {
        attributes[nodeID] = {
            rot: cameraRoot.rotation
        }
        return attributes
    }
}