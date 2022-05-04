import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class BreakVec2 extends Node {
    x = 0
    y = 0

    constructor() {
        super([
            {label: 'Vector', key: 'v', accept: [DATA_TYPES.VEC2]}
        ], [
            {label: 'X', key: 'xR', type: DATA_TYPES.FLOAT, color: 'red'},
            {label: 'Y', key: 'yR', type: DATA_TYPES.FLOAT, color: 'green'}
        ]);
        this.name = 'BreakVec2'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({v}, index, outputs) {
        let response = []
        outputs.forEach(o => {
            if (!this[o]) {
                this[o] = o + `${index}`
                response.push(`float ${this[o]} = ${v.name}.${o.replace('R', '')};`)
            }
        })

        return response.join('\n')
    }

}