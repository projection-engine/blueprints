import Node from "../../../../components/templates/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"


export default class Saturate extends Node {
    constructor() {
        super([
            {label: 'In', key: 'a', accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: 'Result', key: 'saturateRes', type: DATA_TYPES.FLOAT}
        ]);
        this.name = 'Saturate'
        this.size = 2
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

    getFunctionCall({a}, index) {
        this.saturateRes = 'saturateRes' + index
        if(a)
            return `float ${this.saturateRes} = clamp(${a.name}, 0., 1.);`
        else
            return `float ${this.saturateRes};`
    }

}