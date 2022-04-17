import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import checkFloat from "../utils/checkFloat";


export default class RGB extends Node {
    v = 'rgb(0,0,0)'
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
            {label: 'Value', key: 'v', type: DATA_TYPES.COLOR},
        ], [
            {label: 'Value', key: 'COLOR_RGB', type: DATA_TYPES.VEC3},
        ]);

        this.name = 'RGB'
    }

    get type() {
        return NODE_TYPES.VARIABLE
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index, uniforms, uniformData) {
        const split = this.v.match(/[\d.]+/g)
        const v = split.map(v => parseFloat(v))

        if (this.uniform) {
            this.uniformName = `COLOR_RGB${index}`
            uniformData.push({
                key: this.uniformName,
                data: v.map(i => i/255),
                type: DATA_TYPES.VEC3
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.VEC3,
                normalized: true
            })

            return `uniform float ${this.uniformName};`
        } else {
            this.uniformName = `COLOR_RGB${index}`

            return `#define ${this.uniformName} vec3(${checkFloat(v[0]/255)}, ${checkFloat(v[1]/255)}, ${checkFloat(v[2]/255)})`
        }
    }

    getFunctionCall(_, index) {
        this.COLOR_RGB = 'COLOR_RGB' + index
        return ''
    }
}