import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class LerpVec2 extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.VEC2]},
            {label: "B", key: "b", accept: [DATA_TYPES.VEC2]},
            {label: "Percentage", key: "c", accept: [DATA_TYPES.FLOAT]},
        ], [
            {label: "Result", key: "resLerp", type: DATA_TYPES.VEC2}
        ])
        this.name = "LerpVec2"
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
            return `vec2 ${this.resLerp} = mix(${a.name}, ${b.name}, ${c.name});`
        else
            return `vec2 ${this.resLerp};`
    }

}