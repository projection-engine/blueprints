import Node from '../../components/Node'
import {DATA_TYPES} from "../../components/DATA_TYPES";
import NODE_TYPES from "../../components/NODE_TYPES";


export default class Material extends Node {
    ambientInfluence = true
    isForwardShaded = false
    rsmAlbedo
    doubledSided = true
canBeDeleted = false
    constructor() {
        const allTypes = [DATA_TYPES.VEC4, DATA_TYPES.VEC3, DATA_TYPES.VEC2, DATA_TYPES.FLOAT, DATA_TYPES.INT]
        super([
            {label: 'Albedo', key: 'al', accept: allTypes},
            {label: 'Normal', key: 'normal', accept: allTypes},

            {label: 'Ambient Occlusion', key: 'ao', accept: allTypes},
            {label: 'Roughness', key: 'roughness', accept: allTypes},
            {label: 'Metallic', key: 'metallic', accept: allTypes},
            {label: 'Opacity', key: 'opacity', accept: allTypes, disabled: true},
            {label: 'Refraction', key: 'refraction', accept: allTypes, disabled: true},

            {label: 'Emissive', key: 'emissive', accept: allTypes},
            {label: 'GI albedo', key: 'rsmAlbedo', type: DATA_TYPES.TEXTURE, hiddenShowcase: true},

            {
                label: 'Ambient influence',
                key: 'ambientInfluence',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Yes', data: true},
                    {label: 'No', data: false}
                ]
            },
            {
                label: 'Rendering type',
                key: 'isForwardShaded',
                type: DATA_TYPES.OPTIONS,
                onChange: () => console.log('HERE'),
                options: [
                    {label: 'Forward rendering', data: true},
                    {label: 'Deferred rendering', data: false}
                ]
            },
            {
                label: 'Doubled sided',
                key: 'doubledSided',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Yes', data: true},
                    {label: 'No', data: false}
                ]
            }
        ], []);
        this.inputs.find(i => i.key === 'isForwardShaded').onChange = (v) => {
            this.inputs.find(i => i.key === 'refraction').disabled = !v
            this.inputs.find(i => i.key === 'opacity').disabled = !v
        }
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
    getFunctionCall({al, normal, ao, roughness, metallic, opacity, refraction, emissive}) {
        return `
            ${this.isForwardShaded ? 'vec4' : ''} gAlbedo = vec4(${al ? this._getData(al) : 'vec3(.5, .5, .5)'}, 1.);
            ${this.isForwardShaded ? 'vec4' : ''} gNormal = vec4(normalize(toTangentSpace * ((${normal ? this._getData(normal) : 'vec3(.5, .5, 1.)'} * 2.0)- 1.0)), 1.);
            ${this.isForwardShaded ? 'vec4' : ''} gBehaviour =  vec4(${ao ? this._getDataBehaviour(ao) : '1.'},${roughness ? this._getDataBehaviour(roughness) : '1.'},${metallic ? this._getDataBehaviour(metallic) : '0.'}, 1.);
            ${this.isForwardShaded ? `float opacity = ${opacity ? this._getDataBehaviour(opacity) : '1.'};` : ''}
            ${this.isForwardShaded ? `float refraction = ${refraction ? this._getDataBehaviour(refraction) : '0.'};` : ''}
            ${this.isForwardShaded ? 'vec4' : ''} gEmissive = vec4(${emissive ? this._getData(emissive) : 'vec3(.0)'}, 1.);
        `
    }
}