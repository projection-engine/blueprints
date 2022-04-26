import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class Refract extends Node {
    constructor() {
        super([
            {label: 'Vector', key: 'a', accept: [DATA_TYPES.VEC3]},
            {label: 'Normal', key: 'n', accept: [DATA_TYPES.VEC3]},
            {label: 'Ratio', key: 'r', accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: 'Result', key: 'refractRes', type: DATA_TYPES.VEC3}
        ]);
        this.name = 'Refract'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({n, a, r}, index) {
        this.refractRes = 'refractRes' + index

        if(a)
            return `vec3 ${this.refractRes} = refract(${a.name}, ${n.name}, ${r.name});`
        else
            return ''
    }
}