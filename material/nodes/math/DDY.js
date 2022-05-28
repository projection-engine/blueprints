import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class DDY extends Node {
    constructor() {
        super([
            {label: 'Y', key: 'a', accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: 'Result', key: 'ddyRes', type: DATA_TYPES.FLOAT}
        ]);
        this.name = 'DDY'
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
        this.ddyRes = 'ddyRes' + index

        if(a)
            return `float ${this.ddyRes} = dFdy(${a.name});`
        else
            return `float ${this.ddyRes} = 0.;`
    }
}