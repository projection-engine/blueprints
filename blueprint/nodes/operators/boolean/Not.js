import Node from "../../../../base/Node";
import {TYPES} from "../../../../base/TYPES";
import NODE_TYPES from "../../../../base/NODE_TYPES";


export default class Not extends Node {

    constructor() {
        super(
            [
                {label: 'A', key: 'a', accept: [TYPES.ANY]}
            ],
            [
                {label: 'Truthful', key: 't', type: TYPES.BOOL}
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