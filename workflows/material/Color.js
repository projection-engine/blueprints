import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";

export default class Color extends Node {
    rgb = 'rgb(0,0,0)'

    constructor() {
        super(
            [
                {label: 'rgb', key: 'rgb', type: TYPES.COLOR}
            ],
            [
                {label: 'rgb', key: 'rgb', type: TYPES.COLOR}
            ]);
        this.name = 'Color'
    }

    compile([a, b], fileSystem) {
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}