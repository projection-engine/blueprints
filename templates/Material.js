import Node from './Node'
import {linearAlgebraMath} from "pj-math";

export default class Material extends Node {
    type = 'addition'

    constructor() {
        super(
            [
                {label: 'Base color', key: 'base-color'},
                {label: 'Metallic', key: 'metallic'},
                {label: 'Specular', key: 'specular'},
                {label: 'Roughness', key: 'roughness'},
                {label: 'Normal', key: 'normal'},
                {label: 'Ambient occlusion', key: 'ao'},
            ]);
        this.name = 'New material'
    }

}