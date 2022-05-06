import Node from "../../../components/Node";
import COMPONENTS from "../../../../../engine/templates/COMPONENTS";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";

export default class GetWorldTranslation extends Node {

    constructor() {
        super(
            [
                {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
                {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            ],
            [
                {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
                {label: 'Position', key: 'positionRes', type: DATA_TYPES.VEC3},
                {label: 'X', key: 'xRes', type: DATA_TYPES.NUMBER},
                {label: 'Y', key: 'yRes', type: DATA_TYPES.NUMBER},
                {label: 'Z', key: 'zRes', type: DATA_TYPES.NUMBER}
            ]);
        this.name = 'GetWorldTranslation'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({entity}, index) {
        this.positionRes = 'positionRes' + index
        this.xRes = 'xRes' + index
        this.yRes = 'yRes' + index
        this.zRes = 'zRes' + index

        if (entity)
            return `const [${this.positionRes}, ${this.xRes}, ${this.yRes}, ${this.zRes}] = [${entity.name}.components[params.COMPONENTS.TRANSFORM].translation, ${entity.name}.components[params.COMPONENTS.TRANSFORM].translation[0], ${entity.name}.components[params.COMPONENTS.TRANSFORM].translation[1], ${entity.name}.components[params.COMPONENTS.TRANSFORM].translation[2]];`
        else
            return `const ${this.positionRes} = [[0,0,0], 0,0,0];`
    }


}