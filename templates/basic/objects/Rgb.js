import Node from '../Node'

export default class Rgb extends Node {
    constructor(r, g, b) {
        super([
                {label: 'Red', key: 'r', accept: ['Constant']},
                {label: 'Green', key: 'g', accept: ['Constant']},
                {label: 'Blue', key: 'b', accept: ['Constant']},
            ],
            [{label: 'rgb', type: 'object', key: 'rgb'}]);
        this.r = r
        this.g = g
        this.b = b
        this.rgb = {r: this.r, g: this.g, b: this.b}
        this.name = 'RGB'
    }
}