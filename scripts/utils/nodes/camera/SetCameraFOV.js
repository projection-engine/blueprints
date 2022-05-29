import Node from "../../../../components/Node";
import NODE_TYPES from "../../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES";

const toDeg = 57.29
export default class SetCameraFOV extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'FOV', key: 'fov', accept: [DATA_TYPES.NUMBER]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraFOV'
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

    getFunctionCall({fov}, index) {
        return `
        params.camera.fov = ${fov.name}
        params.camera.updateProjection()
        `
    }

}