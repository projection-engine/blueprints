import Node from "../../../../components/templates/Node"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"

export default class SetCameraPosition extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'X', key: 'x', accept: [DATA_TYPES.NUMBER]},
            {label: 'Y', key: 'y', accept: [DATA_TYPES.NUMBER]},
            {label: 'Z', key: 'z', accept: [DATA_TYPES.NUMBER]},
        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
        ]);
        this.name = 'SetCameraPosition'
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

    getFunctionCall({x, y, z}) {
        return `
            params.camera.position = [${x.name},${y.name},${z.name}]
            params.camera.updateViewMatrix()
        `
    }

}