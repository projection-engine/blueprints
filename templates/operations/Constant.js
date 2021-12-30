import Node from '../Node'

export default class Constant extends Node {
    constructor(value = 0.0) {
        super();
        this.value = value
    }
}