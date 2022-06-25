import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class Cosine extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "cosRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "Cosine"
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
        this.cosRes = "cosRes" + index

        if(a)
            return `float ${this.cosRes} = cos(${a.name});`
        else
            return `float ${this.cosRes} = 0.;`
    }
}