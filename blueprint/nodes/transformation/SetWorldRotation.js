import Node from "../../../base/Node";
import COMPONENTS from "../../../../../services/engine/templates/COMPONENTS";
import NODE_TYPES from "../../../base/NODE_TYPES";
import {TYPES} from "../../../base/TYPES";

export default class SetWorldRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'Quaternion', key: 'rotation', accept: [TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION}]);
        this.name = 'SetWorldRotation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {rotation, entity}, entities, attributes, nodeID) {
        console.log(rotation)
        entity.components[COMPONENTS.TRANSFORM].rotationQuat = rotation
        return attributes
    }
}