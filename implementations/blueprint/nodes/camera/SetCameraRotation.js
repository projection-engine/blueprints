import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {mat4, quat} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

const toDeg = 57.29
export default class SetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Yaw', key: 'x', accept: [TYPES.NUMBER], componentRequired: COMPONENTS.CAMERA},
            {label: 'Pitch', key: 'y', accept: [TYPES.NUMBER], componentRequired: COMPONENTS.CAMERA},
            {label: 'Roll', key: 'z', accept: [TYPES.NUMBER], componentRequired: COMPONENTS.CAMERA},
        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraRotation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, { x, y, z, cameraRoot}, entities, attributes) {

        cameraRoot.yaw = x
        cameraRoot.pitch = y
        cameraRoot.roll = z

        return attributes
    }
}