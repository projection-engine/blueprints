import Node from "../../../../components/Node";
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../../components/NODE_TYPES";


export default class EventTick extends Node {
    tick = 0
    canBeDeleted = true
    constructor() {
        super([], [{label: 'Tick', key: 'execute', type: DATA_TYPES.EXECUTION}]);
        this.name = 'EventTick'
        this.size = 2
    }

    get type (){
        return NODE_TYPES.START_POINT
    }

    getFunctionCall() {
        return `
           this.${this.classInstanceName}(params)
        `
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionInstance( content='', index) {
        this.classInstanceName = `eventTick${index}`
        return `
            eventTick${index}(params){
                ${content}
            }
        `
    }

}