import Node from '../../../../components/Node'
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../../components/NODE_TYPES";


export default class Add extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [DATA_TYPES.NUMBER]},
            {label: 'B', key: 'b', accept: [DATA_TYPES.NUMBER] }
        ], [
            {label: 'Result', key: 'addRes', type: DATA_TYPES.NUMBER}
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
        if(b && a)
            return `const ${this.addRes} = ${a.name} + ${b.name};`
        else
            return `const ${this.addRes};`
    }

}