import Node from "../../../templates/Node";

export default class TextureSample extends Node {
    sample = {}
    uv = 1
    constructor() {
        super([
            {label: 'UV scale', key: 'uv', type: 'Constant', accept: ['Constant']},
            {label: 'Blend color', key: 'blend', accept: ['Rgb', 'Rgba']},
        ], [{label: 'rgba', type: 'Image', key: 'sample'}]);
        this.name = 'Texture sample'
    }

    showcase() {
        return (
            <img
                src={this.sample?.blob}
                style={{
                    border: 'var(--fabric-border-primary) 2px solid',
                    height: '175px',
                    width: '175px',
                    borderRadius: '5px'
                }}
                alt={'Texture sample'}
            />
        )
    }
}

