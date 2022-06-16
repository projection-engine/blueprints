import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class DDX extends Node {
    constructor() {
        super([
            {label: "X", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "ddxRes", type: DATA_TYPES.FLOAT}
        ])
        this.name = "DDX"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ""
    }

    async  getInputInstance(index) {
        return ""
    }

    getFunctionCall({a}, index) {
        this.ddxRes = "ddxRes" + index

        if(a)
            return `float ${this.ddxRes} = dFdx(${a.name});`
        else
            return `float ${this.ddxRes} = 0.;`
    }
}