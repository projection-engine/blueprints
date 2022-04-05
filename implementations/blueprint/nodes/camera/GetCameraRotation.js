import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {mat4, quat} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

const toDeg = 57.29
export default class GetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
            {label: 'Yaw', key: 'x', type: TYPES.NUMBER},
            {label: 'Pitch', key: 'y', type: TYPES.NUMBER},
            {label: 'Roll', key: 'z', type: TYPES.NUMBER},
        ]);
        this.name = 'GetCameraRotation'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {cameraRoot}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].x = cameraRoot.yaw
        attributes[nodeID].y = cameraRoot.pitch
        attributes[nodeID].z = cameraRoot.row

        return attributes
    }
}