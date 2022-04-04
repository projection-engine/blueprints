import Node from '../../../flow/Node'
import {TYPES} from "../../../flow/TYPES";
import NODE_TYPES from "../../../flow/NODE_TYPES";

export default class Color extends Node {
    rgb = 'rgb(0,0,0)'

    constructor() {
        super(
            [
                {label: 'RGB', key: 'rgb', type: TYPES.COLOR}
            ],
            [
                {label: 'RGB', key: 'rgb', type: TYPES.COLOR}
            ]);
        this.name = 'Color'
    }
    get type (){
        return NODE_TYPES.DATA
    }
    compile([a, b], fileSystem) {
        if(this.ready)
            return new Promise(r => r())
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}