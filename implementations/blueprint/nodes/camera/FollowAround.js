import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {vec3} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

export default class FollowAround extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM}
        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION},
        ]);
        this.name = 'FollowAround'

    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {cameraRoot, entity}, entities, attributes) {
        const transform = entity.components[COMPONENTS.TRANSFORM]
        cameraRoot.rotation = transform.rotationQuat
        cameraRoot.translation = vec3.add([], transform.translation, cameraRoot.position)
        console.log(transform)
        cameraRoot.updateViewMatrix()
        return attributes
    }
}