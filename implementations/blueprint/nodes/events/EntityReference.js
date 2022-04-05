import Node from "../../../../flow/Node";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";

import {v4 as uuidv4} from 'uuid';

export default class EntityReference extends Node {
    constructor(id, name, components) {
        super(
            [],
            [
                {label: 'Entity', key: 'entity', type: TYPES.ENTITY, components: components}
            ]);
        this.size = 2
        this.id = id + '/' + uuidv4()
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