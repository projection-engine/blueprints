import Node from "../../../../components/Node";
import {DATA_TYPES} from "../../../../components/DATA_TYPES";
import NODE_TYPES from "../../../../components/NODE_TYPES";


export default class Not extends Node {

    constructor() {
        super(
            [
                {label: 'A', key: 'a', accept: [DATA_TYPES.ANY]}
            ],
            [
                {label: 'Truthful', key: 't', type: DATA_TYPES.BOOL}
            ],
            true
        );
       this.name = 'Not'
        this.size = 2
    }

    get type (){
        return NODE_TYPES.FUNCTION
    }
    static compile(tick, {a}, entities, attributes, nodeID) {
        attributes[nodeID] = {}
        attributes[nodeID].t = !a

        return attributes
    }
}