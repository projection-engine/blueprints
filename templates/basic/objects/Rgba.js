import Node from '../Node'

export default class Rgba extends Node {
    constructor(r, g, b, a) {
        super([
                {label: 'Red', key: 'r', accept: ['Constant']},
                {label: 'Green', key: 'g', accept: ['Constant']},
                {label: 'Blue', key: 'b', accept: ['Constant']},
                {label: 'Alpha', key: 'a', accept: ['Constant']}
            ],
            [{label: 'rgba', type: 'object', key: 'rgba'}]);
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        this.rgba = {r: this.r, g: this.g, b: this.b, a: this.a}
        this.name = 'RGBA'
    }
}