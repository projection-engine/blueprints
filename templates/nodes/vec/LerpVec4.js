import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class LerpVec4 extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.VEC4]},
            {label: "B", key: "b", accept: [DATA_TYPES.VEC4]},
            {label: "Percentage", key: "c", accept: [DATA_TYPES.FLOAT]},
        ], [
            {label: "Result", key: "resLerp", type: DATA_TYPES.VEC4}
        ])
        this.name = "LerpVec4"
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ""
    }

    async  getInputInstance() {
        return ""
    }

    getFunctionCall({a,b, c}, index) {
        this.resLerp = "resLerp" + index
        if(b && a)
            return `vec4 ${this.resLerp} = mix(${a.name}, ${b.name}, ${c.name});`
        else
            return `vec4 ${this.resLerp};`
    }

}