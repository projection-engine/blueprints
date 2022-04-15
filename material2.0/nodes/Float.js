import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class Float extends Node {
    v = 0
    constructor() {
        super([

            {label: 'Value', key: 'v',  type: DATA_TYPES.FLOAT},
        ], [
            {label: 'Value', key: 'floatVar',  type: DATA_TYPES.FLOAT},
        ]);

        this.name = 'Float'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VARIABLE
    }

    getFunctionInstance(){
        return ''
    }
    async getInputInstance(index, uniforms, uniformData){

        this.uniformName = `floatVar${index}`
        uniformData.push({
            key: this.uniformName,
            data: this.v,
            type: DATA_TYPES.FLOAT
        })
        uniforms.push({
            label: this.name,
            key:  this.uniformName,
            type: DATA_TYPES.FLOAT
        })

        return `uniform float ${this.uniformName};`
    }

    getFunctionCall(_, index){
        this.floatVar ='floatVar'+index
        return ''
    }
}