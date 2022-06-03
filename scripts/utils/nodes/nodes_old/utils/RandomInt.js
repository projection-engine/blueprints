import Node from "../../../../../components/Node"
import {DATA_TYPES} from "../../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../../components/NODE_TYPES"


export default class RandomInt extends Node {

    constructor() {
        super([

                {label: 'Max', key: 'max', accept: [DATA_TYPES.NUMBER]},
                {label: 'Min', key: 'min', accept: [DATA_TYPES.NUMBER]}
            ],
            [{label: 'Number', key: 'num', type: DATA_TYPES.NUMBER}]);
        this.name = 'RandomInt'
    }

    get type (){
        return NODE_TYPES.FUNCTION
    }
    static compile(tick, {max, min}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].num = Math.round(Math.random() * (max - min + 1) + min)
        return attributes

    }
}