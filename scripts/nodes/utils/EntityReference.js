import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";

import {v4 as uuidv4} from 'uuid';

export default class EntityReference extends Node {
    constructor(id, name, components) {
        super(
            [],
            [
                {label: 'Entity', key: 'entityRes', type: DATA_TYPES.ENTITY, components: components}
            ]);
        this.size = 2
        this.id = uuidv4()
        this.entityID = id
        this.name = name
    }

    get type() {
        return NODE_TYPES.REFERENCE
    }


    getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall(_, index) {
        this.entityRes = 'entityRes' + index
            return `const ${this.entityRes} = params.entities['${this.entityID}'];`

    }

}