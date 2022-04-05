import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {mat4, quat} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

const toDeg = 57.29
export default class SetCameraAspectRatio extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Aspect ratio', key: 'as', accept: [TYPES.NUMBER]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraAspectRatio'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {as, cameraRoot}, entities, attributes) {
        cameraRoot.aspectRatio = as

        return attributes
    }
}