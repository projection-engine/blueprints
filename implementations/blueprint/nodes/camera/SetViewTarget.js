import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import {mat4, quat} from "gl-matrix";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";
import Transformation from "../../../../../../services/engine/utils/workers/Transformation";

export default class SetViewTarget extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.CAMERA},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION}
        ]);
        this.name = 'SetViewTarget'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {entity, cameraRoot}, entities, attributes, nodeID) {
        const comp = entity.components[COMPONENTS.CAMERA]
        const transform = entity.components[COMPONENTS.TRANSFORM]
        const euler = Transformation.getEuler(transform.rotationQuat)
        cameraRoot.position = transform.translation

        cameraRoot.yaw = euler[0]
        cameraRoot.pitch = euler[1]
        cameraRoot.roll = euler[2]

        cameraRoot.zFar = comp.zFar
        cameraRoot.zNear = comp.zNear

        cameraRoot.fov = comp.fov
        cameraRoot.aspectRatio = comp.aspectRatio

        return attributes
    }
}