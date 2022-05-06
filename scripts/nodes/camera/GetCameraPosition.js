import Node from "../../../components/Node";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";

const toDeg = 57.29
export default class GetCameraPosition extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
            {label: 'X', key: 'xRes', type: DATA_TYPES.NUMBER},
            {label: 'Y', key: 'yRes', type: DATA_TYPES.NUMBER},
            {label: 'Z', key: 'zRes', type: DATA_TYPES.NUMBER},
        ]);
        this.name = 'GetCameraPosition'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall(_, index) {
        this.xRes = 'xRes' + index
        this.yRes = 'yRes' + index
        this.zRes = 'zRes' + index

        return `const [${this.xRes},${this.yRes},${this.zRes}] = params.camera.position;`
    }
}