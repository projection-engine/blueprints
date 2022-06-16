import Node from "../../../../components/templates/Node"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"

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
    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall() {
        return `
            params.camera.updateViewMatrix()
        `
    }
}