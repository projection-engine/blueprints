import Node from "../../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../NODE_TYPES"


export default class SineH extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "sineHRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "SineH"
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

    getFunctionCall({a}, index) {
        this.sineHRes = "sineHRes" + index

        if(a)
            return `float ${this.sineHRes} = sinh(${a.name});`
        else
            return `float ${this.sineHRes} = 0.;`
    }
}