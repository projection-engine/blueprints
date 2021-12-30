import Node from '../basic/Node'

export default class PBRMaterial extends Node {
    constructor(baseColor, metallic, specular, roughness, normal, ao) {
        super(
            [
                {label: 'Base color', key: 'baseColor', accept: ['Rgb', 'Rgba']},
                {label: 'Metallic', key: 'metallic', accept: ['Rgb', 'Rgba']},
                {label: 'Specular', key: 'specular', accept: ['Rgb', 'Rgba']},
                {label: 'Roughness', key: 'roughness', accept: ['Rgb', 'Rgba']},
                {label: 'Normal', key: 'normal', accept: ['Rgb', 'Rgba']},
                {label: 'Ambient occlusion', key: 'ao', accept: ['Rgb', 'Rgba']},
            ],
            [{label: 'Material', key: 'material'}]);

        this.name = 'PBR Material'
        this.baseColor = baseColor
        this.metallic = metallic
        this.specular = specular
        this.roughness = roughness
        this.normal = normal
        this.ao = ao
    }
}