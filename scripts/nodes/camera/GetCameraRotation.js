import Node from "../../../components/Node";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";

const toDeg = 57.29
export default class GetCameraRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
            {label: 'Rotation', key: 'camRotRes', type: DATA_TYPES.VEC4},

        ]);
        this.name = 'GetCameraRotation'
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
        this.camRotRes = 'camRotRes'+index
        return `const ${this.camRotRes} = params.camera.rotation;`
    }

}