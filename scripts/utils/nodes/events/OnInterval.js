import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"


export default class OnInterval extends Node {
    interval = 1000
    constructor() {
        super(
            [
                {label: 'Interval', key: 'interval', type: DATA_TYPES.NUMBER, bundled: true, precision: 0}
            ],
            [
                {key: 'execute', type: DATA_TYPES.EXECUTION},
            ],
        );
        this.name = 'OnInterval'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.START_POINT
    }

    getFunctionCall() {

        return `
            if(!this.state.spawnedInterval){
                this.state.spawnedInterval = true
                this.${this.classInstanceName}(params)
            }  
        `
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionInstance( content='', index) {
        this.classInstanceName = `onInterval${index}`
        return `
            ${this.classInstanceName}(params){
                ${content}
            }
        `
    }
}