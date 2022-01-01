import Node from '../basic/Node'
import Response from "../Response";

export default class BasicMaterial extends Response {
    ambientColor
    specular
    diffuse
    shininess


    constructor() {
        super([
                {label: 'Base color', key: 'ambientColor', accept: ['Rgb']},
                {label: 'Diffuse', key: 'diffuse', accept: ['Rgb']},
                {label: 'Specular', key: 'specular', accept: ['Rgb']},
                {label: 'Shininess', key: 'shininess', accept: ['Constant']}
            ])
        this.name = 'Basic Material'
    }
}