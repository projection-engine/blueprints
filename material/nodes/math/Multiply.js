import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class Multiply extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [DATA_TYPES.FLOAT, DATA_TYPES.INT, DATA_TYPES.VEC4, DATA_TYPES.VEC3, DATA_TYPES.VEC2 ]},
            {label: 'B', key: 'b', accept: [DATA_TYPES.FLOAT, DATA_TYPES.INT, DATA_TYPES.VEC4, DATA_TYPES.VEC3, DATA_TYPES.VEC2 ] }
        ], [
            {label: 'Result', key: 'multRes', type: DATA_TYPES.UNDEFINED}
        ]);
        this.equalTypeInputs = true
        this.name = 'Multiply'
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
        this.multRes = 'multRes' + index
        if(b && a)
            return `${a.type} ${this.multRes} = ${a.name} * ${b.name};`
        else
            return `${a.type} ${this.multRes};`
    }

}