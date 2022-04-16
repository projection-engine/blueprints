import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import MATERIAL_TYPES from "../../../../services/engine/templates/MATERIAL_TYPES";


export default class Material extends Node {
    ambientInfluence = true
    constructor() {
        const allTypes = [DATA_TYPES.VEC4, DATA_TYPES.VEC3, DATA_TYPES.VEC2, DATA_TYPES.FLOAT, DATA_TYPES.INT]
        super([
            {label: 'Albedo', key: 'al', accept: allTypes},
            {label: 'Normal', key: 'normal', accept: allTypes},

            {label: 'Ambient Occlusion', key: 'ao', accept: allTypes},
            {label: 'Roughness', key: 'roughness', accept: allTypes},
            {label: 'Metallic', key: 'metallic', accept: allTypes},

            {
                label: 'Ambient influence',
                key: 'ambientInfluence',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Yes', data: true},
                    {label: 'No', data: false}
                ]
            }
        ], []);

        this.name = 'Material'
    }

    get type() {
        return NODE_TYPES.OUTPUT
    }

    getFunctionInstance() {
        return ''
    }

    _getData(field) {
        switch (field.type) {
            case DATA_TYPES.VEC2:
                return `vec3(${field.name}, 0.)`
            case DATA_TYPES.VEC4:
                return `vec3(${field.name})`
            case DATA_TYPES.FLOAT:
                return `vec3(${field.name}, ${field.name}, ${field.name})`
            case DATA_TYPES.INT:
                return `vec3(float(${field.name}), float(${field.name}), float(${field.name}))`
            default:
                return field.name
        }
    }
    _getDataBehaviour(field) {
        switch (field.type) {
            case DATA_TYPES.VEC2:
            case DATA_TYPES.VEC4:
            case DATA_TYPES.VEC3:
                return `${field.name}.x`
            case DATA_TYPES.INT:
                return `float(${field.name})`
            default:
                return field.name
        }
    }
    // texture and uv = {name: variable name, value: variable value if static}
    getFunctionCall({al, normal, ao, roughness, metallic}) {
        return `
            gAlbedo = vec4(${al ? this._getData(al) : 'vec3(.5, .5, .5)'}, 1.);
            gNormal = ${normal ? `vec4(normalize(toTangentSpace * ((${this._getData(normal)} * 2.0) - 1.0)), 1.0);` : 'vec4(normalVec, 1.);'}
            gBehaviour =  vec4(${ao ? this._getDataBehaviour(ao): '1.'},${roughness ? this._getDataBehaviour(roughness): '1.'},${metallic ? this._getDataBehaviour(metallic): '0.'}, 1.);
        `
    }
}