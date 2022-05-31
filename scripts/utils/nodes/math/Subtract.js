import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"


export default class Subtract extends Node {
    constructor() {
        super([
            {label: 'A', key: 'a', accept: [DATA_TYPES.NUMBER]},
            {label: 'B', key: 'b', accept: [DATA_TYPES.NUMBER] }
        ], [
            {label: 'Result', key: 'subRes', type: DATA_TYPES.NUMBER}
        ]);
        this.equalTypeInputs = true
        this.name = 'Subtract'
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
        this.subRes = 'subRes' + index
        if(b && a)
            return `const ${this.subRes} = ${a.name}-${b.name};`
        else
            return `const ${this.subRes};`
    }

}