import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";

export default class Color extends Node {
    rgb = 'rgb(0,0,0)'

    constructor() {
        super(
            [
                {label: 'RGB', key: 'rgb', type: DATA_TYPES.COLOR}
            ],
            [
                {label: 'RGB', key: 'rgb', type: DATA_TYPES.COLOR}
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