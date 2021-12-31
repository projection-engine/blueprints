import Node from '../basic/Node'

export default class BasicMaterial extends Node {
    ambientColor
    specular
    diffuse
    shininess


    constructor() {
        super(
            [
                {label: 'Base color', key: 'ambientColor', accept: ['Rgb']},
                {label: 'Diffuse', key: 'diffuse', accept: ['Rgb']},
                {label: 'Specular', key: 'specular', accept: ['Rgb']},
                {label: 'Shininess', key: 'shininess', accept: ['Constant']}
            ],
            [{label: 'Material', key: 'material'}]);

        this.name = 'Basic Material'
    }
}