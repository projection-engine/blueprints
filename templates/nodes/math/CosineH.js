import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class CosineH extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "cosHRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "CosineH"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


     

    async  getInputInstance() {
        return ""
    }

    getFunctionCall({a}, index) {
        this.cosHRes = "cosHRes" + index

        if(a)
            return `float ${this.cosHRes} = cosh(${a.name});`
        else
            return `float ${this.cosHRes} = 0.;`
    }

}