import Node from "../../../components/Node";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../components/DATA_TYPES";

export default class SetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'Rotation', key: 'rot', accept: [DATA_TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraRotation'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }
    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({rot}, index) {
        return `
        params.camera.rotation = params.glMatrix.quat.normalize([], ${rot.name})
        params.camera.updateViewMatrix()
        `
    }
}