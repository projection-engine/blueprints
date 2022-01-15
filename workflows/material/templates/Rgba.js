import Node from '../../../templates/Node'

export default class Rgba extends Node {
    r = 0
    g = 0
    b = 0
    a = 1
    rgba = 'rgba(0,0,0,1)'

    constructor() {
        super(undefined, [
            {label: 'R', key: 'r', type: 'Constant', notEditable: true},
            {label: 'G', key: 'g', type: 'Constant', notEditable: true},
            {label: 'B', key: 'b', type: 'Constant', notEditable: true},
            {label: 'A', key: 'a', type: 'Constant', notEditable: true},
            {label: 'rgba', key: 'rgba', type: 'RGBA'}
        ]);
        this.name = 'RGBA'
    }

    showcase() {
        return (
            <div style={{
                border: 'var(--fabric-border-primary) 2px solid',
                backgroundColor: `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`,
                height: '175px',
                width: '175px',
                borderRadius: '5px'
            }}/>
        )
    }
}