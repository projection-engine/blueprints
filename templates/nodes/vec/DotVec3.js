import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class DotVec3 extends Node {

    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.VEC3]},
            {label: "B", key: "b", accept: [DATA_TYPES.VEC3]},
        ], [
            {label: "Result", key: "resDot", type: DATA_TYPES.FLOAT}
        ])

        this.name = "DotVec3"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ""
    }

    async getInputInstance() {
        return ""
    }

    getFunctionCall({a, b}, index) {
        this.resDot = "resDot" + index
        if (b && a)
            return `float ${this.resDot} = dot(${a.name}, ${b.name});`
        else
            return `float ${this.resDot};`
    }

}