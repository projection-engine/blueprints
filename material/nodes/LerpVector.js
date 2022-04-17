import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class Add extends Node {
    constructor() {
        super([
            {label: 'Layer A', key: 'a', accept: [DATA_TYPES.VEC3]},
            {label: 'Layer B', key: 'b', accept: [DATA_TYPES.VEC3]}
        ], [
            {label: 'Result', key: 'addRes', type: DATA_TYPES.VEC3}
        ]);
        this.equalTypeInputs = true
        this.name = 'Add'
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

    getFunctionCall({a,b}, index) {
        this.addRes = 'addRes' + index
        console.log(a, b)
        if(b && a)
            return `${a.type} ${this.addRes} = ${a.name} + ${b.name};`
        else
            return `${a.type} ${this.addRes};`
    }

}