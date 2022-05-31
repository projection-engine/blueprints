import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"


export default class LerpVec3 extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [DATA_TYPES.VEC3]},
            {label: 'B', key: 'b', accept: [DATA_TYPES.VEC3]},
            {label: 'Percentage', key: 'c', accept: [DATA_TYPES.FLOAT]},
        ], [
            {label: 'Result', key: 'resLerp', type: DATA_TYPES.VEC3}
        ]);
        this.name = 'LerpVec3'
        this.size = 1
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

    getFunctionCall({a,b, c}, index) {
        this.resLerp = 'resLerp' + index
        if(b && a && c)
            return `vec3 ${this.resLerp} = mix(${a.name}, ${b.name}, ${c.name});`
        else
            return `vec3 ${this.resLerp};`
    }

}