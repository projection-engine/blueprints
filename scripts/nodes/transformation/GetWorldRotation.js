import Node from "../../../base/Node";
import COMPONENTS from "../../../../../engine/shared/templates/COMPONENTS";
import {DATA_TYPES} from "../../../base/DATA_TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";

export default class GetWorldRotation extends Node {

    constructor() {
        super(
            [
                {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
                {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},

            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
                {label: 'Quaternion', key: 'quaternion', type: DATA_TYPES.VEC4}
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