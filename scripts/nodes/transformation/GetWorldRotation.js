import Node from "../../../components/Node";
import COMPONENTS from "../../../../../engine/templates/COMPONENTS";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";

export default class GetWorldRotation extends Node {

    constructor() {
        super(
            [
                {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
                {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},

            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
                {label: 'Quaternion', key: 'quaternionRes', type: DATA_TYPES.VEC4}
            ]);
        this.name = 'GetWorldRotation'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({entity}, index) {
        this.quaternionRes = 'quaternionRes' + index
        if(entity)
            return `const ${this.quaternionRes} = ${entity.name}.components[params.COMPONENTS.TRANSFORM].rotationQuat;`
        else
            return `const ${this.quaternionRes} = [0,0,0,0];`
    }
}