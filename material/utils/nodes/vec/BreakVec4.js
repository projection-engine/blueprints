import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"


export default class BreakVec4 extends Node {
    x = 0
    y = 0
    z = 0
    w = 0

    constructor() {
        super([
            {label: 'Vector', key: 'v', accept: [DATA_TYPES.VEC4]}
        ], [
            {label: 'X', key: 'x', type: DATA_TYPES.FLOAT, color: 'red'},
            {label: 'Y', key: 'y', type: DATA_TYPES.FLOAT, color: 'green'},
            {label: 'Z', key: 'z', type: DATA_TYPES.FLOAT, color: 'blue'},
            {label: 'W', key: 'w', type: DATA_TYPES.FLOAT, color: 'white'}
        ]);
        this.name = 'BreakVec4'
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
                response.push(`float ${this[o]} = ${v.name}.${o};`)
            }
        })

        return response.join('\n')
    }

}