import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {mat4, quat, vec3} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";
import ROTATION_TYPES from "../../../../../../services/engine/templates/ROTATION_TYPES";

export default class SetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Rotation', key: 'rot', accept: [TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraRotation'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {rot, cameraRoot}, entities, attributes) {
        cameraRoot.rotation = quat.normalize([], rot)
        return attributes
    }
}