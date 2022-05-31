import Node from "../../../../components/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/NODE_TYPES"

export const startKey = 'start'
export default class Setter extends Node {

    constructor(id, name, type) {
        super(
            [
                {label: 'Start', key: startKey, accept: [DATA_TYPES.EXECUTION]},
                {label: 'Value', key: 'value', accept: [type]}
            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
                {label: 'Value', key: 'setterValueRes', type: type}
            ]);
        this.id = id
        this.size = 1
        this.name = name
    }

    get type() {
        return NODE_TYPES.SETTER
    }

    getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({value}, index) {
        const id = this.id.split('/')[0]
        this.setterValueRes = 'setterValueRes' + index
        return `
            this.state['${id}'] = ${value.name};
            const ${this.setterValueRes} = this.state['${id}'];
        `
    }
    static compile(tick, {value}, entities, attributes, nodeID, executors, setExecutors) {

        setExecutors({
            ...executors,
            [nodeID.split('/')[0]]: {
                value
            }
        })
        attributes[nodeID] = {}
        attributes[nodeID].newValue = value
        return attributes
    }
}