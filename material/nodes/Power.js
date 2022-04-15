import Node from "../../base/Node";
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class Power extends Node {
    response

    constructor( ) {
        super([
            {label: 'Texture', key: 'texture', accept: [DATA_TYPES.TEXTURE]},
            {label: 'Value', key: 'valueToMultiply', accept: [DATA_TYPES.COLOR, DATA_TYPES.NUMBER]}
        ], [{label: 'Value', key: 'value', type: DATA_TYPES.NUMBER}]);
        this.name = 'Power'
    }
    get type (){
        return NODE_TYPES.FUNCTION
    }
    compile([a, b], fileSystem) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            this.value = a ** b
            this.ready = true
            resolve()
        })
    }
}