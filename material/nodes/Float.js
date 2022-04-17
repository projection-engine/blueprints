import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import checkFloat from "../utils/checkFloat";


export default class Float extends Node {
    v = 0
    uniform = false

    constructor() {
        super([
            {
                label: 'As uniform',
                key: 'uniform',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Yes', data: true},
                    {label: 'No', data: false}
                ]
            },
            {label: 'Value', key: 'v', type: DATA_TYPES.FLOAT},
        ], [
            {label: 'Value', key: 'FLOAT_VAR', type: DATA_TYPES.FLOAT},
        ]);

        this.name = 'Float'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VARIABLE
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index, uniforms, uniformData) {

        if (this.uniform) {

            this.uniformName = `FLOAT_VAR${index}`
            uniformData.push({
                key: this.uniformName,
                data: this.v,
                type: DATA_TYPES.FLOAT
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.FLOAT
            })

            return `uniform float ${this.uniformName};`
        } else {
            this.uniformName = `FLOAT_VAR${index}`
            return `#define ${this.uniformName} ${checkFloat(this.v)}`
        }
    }

    getFunctionCall(_, index) {
        this.FLOAT_VAR = 'FLOAT_VAR' + index
        return ''
    }
}