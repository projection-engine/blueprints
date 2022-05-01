import Node from "../../../components/Node";
import Transformation from "../../../../../engine/utils/Transformation";
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";

export default class QuaternionToEuler extends Node {
    euler = [0, 0, 0]
    x = 0
    y = 0
    z = 0
    constructor() {
        super(
            [
                {label: 'Quaternion', key: 'q', accept: [DATA_TYPES.VEC4]}
            ],
            [
            {label: 'Euler', key: 'eulerRes', type: DATA_TYPES.VEC3},
            {label: 'X', key: 'xRes', type: DATA_TYPES.NUMBER},
            {label: 'Y', key: 'yRes', type: DATA_TYPES.NUMBER},
            {label: 'Z', key: 'zRes', type: DATA_TYPES.NUMBER}
        ]);
        this.name = 'QuaternionToEuler'
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

    getFunctionCall({q}, index) {
        this.eulerRes = 'eulerRes' + index
        this.xRes = 'xRes' + index
        this.yRes = 'yRes' + index
        this.zRes = 'zRes' + index
        const tempQuatEulerRes ='tempQuatEulerRes' + index
        if (q)
            return `
                const ${tempQuatEulerRes} = params.utils.toEuler(${q.name});
                const [${this.eulerRes}, ${this.xRes}, ${this.yRes}, ${this.zRes}] = [${tempQuatEulerRes}, ${tempQuatEulerRes}[0], ${tempQuatEulerRes}[1], ${tempQuatEulerRes}[2]];
            `
        return ''
    }

    static compile(tick, {quat}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        const q = Transformation.getEuler(quat)
        attributes[nodeID].euler = q
        attributes[nodeID].x = q[0]
        attributes[nodeID].y = q[1]
        attributes[nodeID].z = q[2]

        return attributes

    }
}