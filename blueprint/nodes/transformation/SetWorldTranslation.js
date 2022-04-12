import Node from "../../../base/Node";
import COMPONENTS from "../../../../../services/engine/templates/COMPONENTS";
import {TYPES} from "../../../base/TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";

export default class SetWorldTranslation extends Node {

    constructor() {
        super([

            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'X', key: 'x', accept: [TYPES.NUMBER]},
            {label: 'Y', key: 'y', accept: [TYPES.NUMBER]},
            {label: 'Z', key: 'z', accept: [TYPES.NUMBER]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION}
        ]);
        this.name = 'SetWorldTranslation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {x, y, z, entity}, entities, attributes, nodeID) {
        entity.components[COMPONENTS.TRANSFORM].translation = [x, y, z]
        return attributes
    }
}