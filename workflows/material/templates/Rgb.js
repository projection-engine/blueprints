import Node from '../../../templates/Node'

export default class Rgb extends Node {
    r = 0
    g = 0
    b = 0
    rgb = 'rgb(0,0,0)'

    constructor() {
        super(undefined, [
            {label: 'R', key: 'r', type: 'Constant', notEditable: true},
            {label: 'G', key: 'g', type: 'Constant', notEditable: true},
            {label: 'B', key: 'b', type: 'Constant', notEditable: true},
            {label: 'rgb', key: 'rgb', type: 'RGB'}
        ]);

        this.name = 'RGB'

    }

    showcase() {
        return (
            <div style={{
                border: 'var(--fabric-border-primary) 2px solid',
                backgroundColor: `rgb(${this.r}, ${this.g}, ${this.b})`,
                height: '175px',
                width: '175px',
                borderRadius: '5px'
            }}/>
        )
    }
}