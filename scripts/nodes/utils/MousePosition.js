import Node from "../../../components/Node";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";


export default class MousePosition extends Node {

    constructor() {
        super(
            [],
            [
                {label: 'Position', key: 'mousePositionRes', type: DATA_TYPES.VEC2},
                {label: 'X', key: 'xRes', type: DATA_TYPES.NUMBER},
                {label: 'Y', key: 'yRes', type: DATA_TYPES.NUMBER}
            ],
        );
        this.name = 'MousePosition'
    }

    get type() {
        return NODE_TYPES.DATA
    }
    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({ }, index) {
        this.mousePositionRes = 'mousePositionRes' + index
        this.xRes = 'xRes' + index
        this.yRes = 'yRes' + index
        return `
            const [${this.mousePositionRes}, ${this.xRes}, ${this.yRes}] = [params.mousePosition, params.mousePosition.x, params.mousePosition.y]
        `
    }

}