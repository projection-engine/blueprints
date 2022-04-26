import Node from "../../../components/Node";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../components/DATA_TYPES";

const toDeg = 57.29
export default class UpdateCameraLookAt extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]}
        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
        ]);
        this.name = 'UpdateCameraLookAt'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {cameraRoot}, entities, attributes) {
        cameraRoot.updateViewMatrix()
        return attributes
    }
}