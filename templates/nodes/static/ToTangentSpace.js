import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class ToTangentSpace extends Node {

    constructor() {
        super([], [
            {label: "Matrix", key: "toTangentSpace", type: DATA_TYPES.MAT3}
        ])

        this.name = "ToTangentSpace"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ""
    }

    async getInputInstance() {
        return ""
    }
    getFunctionCall() {
        this.toTangentSpace = "toTangentSpace"
        return ""
    }
}