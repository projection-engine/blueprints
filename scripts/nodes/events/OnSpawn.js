import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class OnSpawn extends Node {

    constructor() {
        super(
            [],
            [
                {key: 'execute', type: DATA_TYPES.EXECUTION}
            ]);
        this.size = 1
        this.name = 'OnSpawn'
    }

    get type() {
        return NODE_TYPES.START_POINT
    }
    getFunctionCall() {

        return `
            if(!this.state.spawned){
                this.state.spawned = true
                this.${this.classInstanceName}(params)
            }  
        `
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionInstance( content='', index) {
        this.classInstanceName = `onSpawn${index}`
        return `
            ${this.classInstanceName}(params){
                ${content}
            }
        `
    }
}