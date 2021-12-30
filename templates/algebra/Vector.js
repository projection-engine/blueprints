import Node from '../Node'

export default class Vector extends Node {
    length = 0
    normalized = []

    constructor(values = []) {
        super();
        this.length = values
        this.values = values
        this.normalized = this.values
    }

    get normalized() {
        return this.normalized
    }
    set normalized(values) {
        this.normalized = values.map(v => {
            return v / this.length
        })
    }

    get length() {
        return this.length
    }
    set length(values) {
        let length = 0
        values.forEach(v => {
            length += v ** 2
        })
        this.length = Math.sqrt(length)
    }
}