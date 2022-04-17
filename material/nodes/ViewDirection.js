import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class ViewDirection extends Node {

    constructor() {
        super([], [
            {label: 'Coordinates', key: 'viewDirection', type: DATA_TYPES.VEC3},
            {label: 'X', key: 'r', type: DATA_TYPES.FLOAT, color: 'red'},
            {label: 'Y', key: 'g', type: DATA_TYPES.FLOAT, color: 'green'},
            {label: 'Z', key: 'b', type: DATA_TYPES.FLOAT, color: 'blue'}
        ]);

        this.name = 'ViewDirection'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall(_, index, outputs) {
        let response = []
        console.log(outputs)

        outputs.forEach(o => {
            console.log(this[o])
            if(o === 'viewDirection'){
                this.viewDirection = 'viewDirection'
            }
            else if (!this[o]) {

                    console.trace(o, index)
                    this[o] = o + `${index}`
                    response.push(`float ${this[o]} = viewDirection.${o};`)
                }
        })

        console.log(response)
        return response.join('\n')
    }

}