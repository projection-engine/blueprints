import Node from "../../../components/Node";
import COMPONENTS from "../../../../../engine/templates/COMPONENTS";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../components/DATA_TYPES";

export default class SetViewTarget extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.CAMERA},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION}
        ]);
        this.name = 'SetViewTarget'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {entity, cameraRoot}, entities, attributes, nodeID) {
        const comp = entity.components[COMPONENTS.CAMERA]
        const transform = entity.components[COMPONENTS.TRANSFORM]

        cameraRoot.position = transform.translation
        cameraRoot.rotation = transform.rotationQuat

        cameraRoot.zFar = comp.zFar
        cameraRoot.zNear = comp.zNear

        cameraRoot.fov = comp.fov
        cameraRoot.aspectRatio = comp.aspectRatio


        cameraRoot.updateViewMatrix()
        cameraRoot.updateProjection()

        return attributes
    }
}
