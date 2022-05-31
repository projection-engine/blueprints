import Node from "../../../../components/Node"
import COMPONENTS from "../../../../../../engine/templates/COMPONENTS"
import NODE_TYPES from "../../../../components/NODE_TYPES"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"

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


    getFunctionInstance() {
        return ` 
        `
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({entity}, index) {
        const entityName = 'viewEntity'+index
        const transformName = 'viewEntityTransform'+index
        return `
            const ${entityName} = ${entity.name}.components[params.COMPONENTS.CAMERA];
            const ${transformName} = ${entity.name}.components[params.COMPONENTS.TRANSFORM];
            
            params.camera.position = ${transformName}.translation
            params.camera.rotation = ${transformName}.rotationQuat
    
            params.camera.zFar = ${entityName}.zFar
            params.camera.zNear = ${entityName}.zNear
    
            params.camera.fov = ${entityName}.fov
            params.camera.aspectRatio = ${entityName}.aspectRatio
            params.camera.distortion =   ${entityName}.distortion
            params.camera.distortionStrength = ${entityName}.distortionStrength
            params.camera.chromaticAberration = ${entityName}.chromaticAberration
            params.camera.chromaticAberrationStrength = ${entityName}.chromaticAberrationStrength
    
            params.camera.filmGrain = ${entityName}.filmGrain
            params.camera.filmGrainStrength = ${entityName}.filmGrainStrength
            params.camera.bloom = ${entityName}.bloom
            params.camera.bloomStrength = ${entityName}.bloomStrength
            params.camera.bloomThreshold = ${entityName}.bloomThreshold
            params.camera.gamma = ${entityName}.gamma
            params.camera.exposure = ${entityName}.exposure
    
            params.camera.updateViewMatrix()
            params.camera.updateProjection()
        `
    }
}
