import Node from "../../../components/flow/Node";
import {TYPES} from "../templates/TYPES";
import NODE_TYPES from "../templates/NODE_TYPES";


export default class Power extends Node {
    response

    constructor( ) {
        super([
            {label: 'Texture', key: 'texture', accept: [TYPES.TEXTURE]},
            {label: 'Value', key: 'valueToMultiply', accept: [TYPES.COLOR, TYPES.NUMBER]}
        ], [{label: 'Value', key: 'value', type: TYPES.NUMBER}]);
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