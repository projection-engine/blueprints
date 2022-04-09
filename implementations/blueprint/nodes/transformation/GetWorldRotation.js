import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {TYPES} from "../../../../flow/TYPES";
import NODE_TYPES from "../../../../flow/NODE_TYPES";

export default class GetWorldRotation extends Node {

    constructor() {
        super(
            [
                {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
                {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},

            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
                {label: 'Quaternion', key: 'quaternion', type: TYPES.VEC4}
            ]);
        this.name = 'GetWorldRotation'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    static compile(tick, {entity}, entities, attributes, nodeID) {
        attributes[nodeID] = {
            quaternion: entity.components[COMPONENTS.TRANSFORM].rotationQuat
        }
        return attributes
    }
}