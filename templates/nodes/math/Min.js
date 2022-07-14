import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class Min extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]},
            {label: "B", key: "b", accept: [DATA_TYPES.FLOAT] }
        ], [
            {label: "Result", key: "minRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "Min"
        this.size = 2
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

    getFunctionCall({a,b}, index) {
        this.minRes = "minRes" + index
        if(b && a)
            return `float ${this.minRes} = min(${a.name}, ${b.name});`
        else
            return `float ${this.minRes};`
    }

}