import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import randomID from "../../../../../../services/utils/misc/randomID";


export default class EntityReference extends Node {
    constructor(id, name) {
        super(
            [],
            [
                {label: 'Entity', key: 'entity', type: TYPES.ENTITY}
            ]);
        this.size = 2
        this.id = id + '/' + randomID()
        this.name = name
    }

    get type() {
        return NODE_TYPES.REFERENCE
    }

    static compile(tick, inputs, entities, attributes, nodeID, executors) {

        attributes[nodeID] = {}
        attributes[nodeID].entity = entities[executors[nodeID].value]


        return attributes
    }
}