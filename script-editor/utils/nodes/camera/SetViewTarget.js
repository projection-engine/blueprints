import Node from "../../../../components/templates/Node"
import COMPONENTS from "../../../../../../engine/templates/COMPONENTS"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"

export default class SetViewTarget extends Node {

    constructor() {
        super([
            {label: "Start", key: "start", accept: [DATA_TYPES.EXECUTION]},
            {label: "Entity", key: "entity", accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.CAMERA},

        ], [
            {label: "Execute", key: "EXECUTION", type: DATA_TYPES.EXECUTION}
        ])
        this.name = "SetViewTarget"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }


    getFunctionInstance() {
        return ` 
        `
    }

    async getInputInstance() {
        return ""
    }

    getFunctionCall({entity}, index) {
        const entityName = "viewEntity"+index
        const transformName = "viewEntityTransform"+index
        return `
            const ${entityName} = ${entity.name}.components[params.COMPONENTS.CAMERA]
            const ${transformName} = ${entity.name}.components[params.COMPONENTS.TRANSFORM]
            
            params.camera.updateViewTarget(${entityName}, ${transformName})
        `
    }
}
