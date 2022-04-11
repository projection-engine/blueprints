import Node from "../../../../flow/Node";
import COMPONENTS from "../../../../../../services/engine/templates/COMPONENTS";
import NODE_TYPES from "../../../../flow/NODE_TYPES";
import {TYPES} from "../../../../flow/TYPES";

export default class SetViewTargetWithBlend extends Node {

    constructor() {
        super([
                {label: 'Start', key: 'start', accept: [TYPES.EXECUTION]},
                {label: 'Target Camera', key: 'entity', accept: [TYPES.ENTITY], componentRequired: COMPONENTS.CAMERA},
                {
                    label: 'Blend function',
                    key: 'func',
                    type: TYPES.OPTIONS,
                    bundled: true,
                    options: [{value: 'Linear', key: 'Linear'}]
                },
            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: TYPES.EXECUTION}
            ]);
        this.name = 'SetViewTargetWithBlend'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {entity, cameraRoot}, entities, attributes) {
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
