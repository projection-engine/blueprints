import Node from '../../templates/Node'

export default class Float extends Node {
    constructor(value = 0.0) {
        super([], {label: 'Value', key: 'value'});
        this.value = value
        this.name = 'Constant'
    }


}