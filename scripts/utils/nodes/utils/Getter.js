import Node from "../../../../components/Node";
import NODE_TYPES from "../../../../components/NODE_TYPES";


export default class Getter extends Node {

    constructor(id, name, type) {
        super([], [{label: 'Value', key: 'valueRes', type: type}]);

        this.id = id
        this.name = name
        this.size = 2
    }

    get type() {
        return NODE_TYPES.GETTER
    }


    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall(_, index) {
        const id = this.id.split('/')[0]
        this.valueRes = 'valueRes' + index
        return `const ${this.valueRes} = this.state['${id}'];`
    }

}