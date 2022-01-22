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
        if(this.sample?.blob)
            return (
                <img
                    src={this.sample?.blob}
                    style={{
                        border: 'var(--fabric-border-primary) 2px solid',
                        height: '175px',
                        width: '175px',
                        borderRadius: '5px'
                    }}
                    title={this.sample?.name}
                    alt={'Texture sample'}
                />
            )
        else
            return (
                <div
                    style={{
                        border: 'var(--fabric-border-primary) 2px solid',
                        height: '175px',
                        width: '175px',
                        borderRadius: '5px',
                        background: '#e0e0e0'
                    }}
                    title={'Empty texture'}
                />
            )
    }
}

