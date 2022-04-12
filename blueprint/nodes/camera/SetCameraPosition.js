import Node from "../../../base/Node";
import NODE_TYPES from "../../../base/NODE_TYPES";
import {TYPES} from "../../../base/TYPES";

export default class SetCameraPosition extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'X', key: 'x', accept: [TYPES.NUMBER]},
            {label: 'Y', key: 'y', accept: [TYPES.NUMBER]},
            {label: 'Z', key: 'z', accept: [TYPES.NUMBER]},
        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraPosition'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {x, y, z, cameraRoot}, entities, attributes) {

        cameraRoot.position[0] = x
        cameraRoot.position[1] = y
        cameraRoot.position[2] = z

        return attributes
    }
}