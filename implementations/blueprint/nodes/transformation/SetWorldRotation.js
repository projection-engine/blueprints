import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {quat} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

export default class SetWorldRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'Rotation', key: 'rotation', accept: [TYPES.VEC3, TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION}]);
        this.name = 'SetWorldRotation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }
    static  compile(tick, {rotation, entity}, entities, attributes, nodeID) {
        console.log(rotation)
        if (rotation.length === 4)
            entity.components[COMPONENTS.TRANSFORM].rotationQuat = rotation
        else {
            const quatA = [0, 0, 0, 1]

            quat.rotateX(quatA, quatA, rotation[0])
            quat.rotateY(quatA, quatA, rotation[1])
            quat.rotateZ(quatA, quatA, rotation[2])

            entity.components[COMPONENTS.TRANSFORM].rotationQuat = quat.multiply([], quatA, entity.components[COMPONENTS.TRANSFORM].rotationQuat)
        }
        return attributes
    }
}