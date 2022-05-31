import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"

export default class ConstantNumber extends Node {
    num = 0
    constructor() {
        super([{label: 'Number', key: 'num', bundled: true, type: DATA_TYPES.NUMBER},],
            [{label: 'Number', key: 'numRes', type: DATA_TYPES.NUMBER}]);
        this.name = 'Number'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.DATA
    }
     getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({data}, index) {
        const name = `numRes${index}`
        this.numRes =name
        return `const ${name} = ${this.num}`
    }

}