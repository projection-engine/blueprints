import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class RotateVector extends Node {

    constructor() {
        super(
            [
                {label: 'Quat', key: 'a', accept: [DATA_TYPES.VEC4]},
                {label: 'Vector', key: 'b', accept: [DATA_TYPES.VEC3, DATA_TYPES.VEC4]}
            ],
            [
                {label: 'Result', key: 'resRotate', type: DATA_TYPES.VEC3}
            ],
        );
        this.name = 'RotateVector'
    }

    get type (){
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({a, b}, index) {
        this.resRotate = 'resRotate' + index
        if (a && b)
            return `
                const ${this.resRotate} = params.glMatrix.vec3.transformQuat([], ${b.name}, ${a.name})
            `
        return ''
    }
}