import Node from '../../components/Node'
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import NODE_TYPES from "../../components/NODE_TYPES";
import MATERIAL_RENDERING_TYPES from "../../../../engine/templates/MATERIAL_RENDERING_TYPES";

const blendOptions = [
    {label: 'ZERO', data: 'ZERO'},
    {label: 'ONE', data: 'ONE'},
    {label: 'SRC_COLOR', data: 'SRC_COLOR'},
    {label: 'ONE_MINUS_SRC_COLOR', data: 'ONE_MINUS_SRC_COLOR'},
    {label: 'DST_COLOR', data: 'DST_COLOR'},
    {label: 'ONE_MINUS_DST_COLOR', data: 'ONE_MINUS_DST_COLOR'},
    {label: 'SRC_ALPHA', data: 'SRC_ALPHA'},
    {label: 'ONE_MINUS_SRC_ALPHA', data: 'ONE_MINUS_SRC_ALPHA'},
    {label: 'DST_ALPHA', data: 'DST_ALPHA'},
    {label: 'ONE_MINUS_DST_ALPHA', data: 'ONE_MINUS_DST_ALPHA'},
    {label: 'CONSTANT_COLOR', data: 'CONSTANT_COLOR'},
    {label: 'ONE_MINUS_CONSTANT_COLOR', data: 'ONE_MINUS_CONSTANT_COLOR'},
    {label: 'CONSTANT_ALPHA', data: 'CONSTANT_ALPHA'},
    {label: 'ONE_MINUS_CONSTANT_ALPHA', data: 'ONE_MINUS_CONSTANT_ALPHA'},
    {label: 'SRC_ALPHA_SATURATE', data: 'SRC_ALPHA_SATURATE'},
]
const cullFaceOptions = [{data: 'FRONT', label: 'FRONT',}, {data: 'BACK', label: 'BACK',}]
export default class Material extends Node {
    ambientInfluence = true
    shadingType = MATERIAL_RENDERING_TYPES.DEFERRED
    rsmAlbedo

    canBeDeleted = false

    doubledSided = true
    depthMask = true
    depthTest = true
    cullFace = 'BACK'
    blend = true
    blendFuncSource = 'ONE_MINUS_SRC_COLOR'
    blendFuncTarget = 'ONE_MINUS_DST_ALPHA'

    constructor() {
        const yesNo = [{label: 'Yes', data: true}, {label: 'No', data: false}]
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
            {label: 'Global illumination albedo', key: 'rsmAlbedo', type: DATA_TYPES.TEXTURE, hiddenShowcase: true},
            {label: 'World Offset', key: 'worldOffset', accept: [DATA_TYPES.VEC4]},
            {label: 'Ambient influence', key: 'ambientInfluence', type: DATA_TYPES.OPTIONS, options: yesNo},

            {
                label: 'Rendering type',
                key: 'shadingType',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'Forward lit', data: MATERIAL_RENDERING_TYPES.FORWARD},
                    {label: 'Deferred lit', data: MATERIAL_RENDERING_TYPES.DEFERRED},
                    {label: 'Unlit', data: MATERIAL_RENDERING_TYPES.UNLIT}
                ]
            },


            {label: 'Doubled sided', key: 'doubledSided', type: DATA_TYPES.OPTIONS, options: yesNo},
            {label: 'Depth mask', key: 'depthMask', type: DATA_TYPES.OPTIONS, options: yesNo},
            {label: 'Depth test', key: 'depthTest', type: DATA_TYPES.OPTIONS, options: yesNo},
            {label: 'Blend', key: 'blend', type: DATA_TYPES.OPTIONS, options: yesNo},

            {label: 'Blend function target', key: 'blendFuncTarget', type: DATA_TYPES.OPTIONS, options: blendOptions.filter(f =>  f.data.includes('DST') || !f.data.includes('SRC'))},
            {label: 'Blend function source', key: 'blendFuncSource', type: DATA_TYPES.OPTIONS, options: blendOptions.filter(f => f.data.includes('SRC') || !f.data.includes('DST'))},
            {label: 'CullFace', key: 'cullFace', type: DATA_TYPES.OPTIONS, options: cullFaceOptions}
        ], []);
        this.inputs.find(i => i.key === 'shadingType').onChange = (v) => {
            switch (v){
                case MATERIAL_RENDERING_TYPES.FORWARD:
                    this.inputs.find(i => i.key === 'refraction').disabled = false
                    this.inputs.find(i => i.key === 'opacity').disabled = false
                    this.inputs.find(i => i.key === 'roughness').disabled =false
                    this.inputs.find(i => i.key === 'metallic').disabled = false
                    this.inputs.find(i => i.key === 'normal').disabled = false
                    break
                case MATERIAL_RENDERING_TYPES.DEFERRED:
                    this.inputs.find(i => i.key === 'refraction').disabled = true
                    this.inputs.find(i => i.key === 'opacity').disabled = true

                    this.inputs.find(i => i.key === 'roughness').disabled =false
                    this.inputs.find(i => i.key === 'metallic').disabled = false
                    this.inputs.find(i => i.key === 'normal').disabled = false
                    break
                default:
                    this.inputs.find(i => i.key === 'refraction').disabled = true
                    this.inputs.find(i => i.key === 'roughness').disabled = true
                    this.inputs.find(i => i.key === 'metallic').disabled = true
                    this.inputs.find(i => i.key === 'normal').disabled = true
                    break
            }
        }
        this.inputs.find(i => i.key === 'depthTest').onChange = (v) => {
            this.inputs.find(i => i.key === 'depthMask').disabled = v
        }
        this.inputs.find(i => i.key === 'doubledSided').onChange = (v) => {
            this.inputs.find(i => i.key === 'cullFace').disabled = v
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


    getFunctionCall({
                        al,
                        normal,
                        ao,
                        roughness,
                        metallic,
                        opacity,
                        refraction,
                        emissive,
                        worldOffset
                    }, n1, n2, n3, isVertex) {

        if (!isVertex)
            return `
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? 'vec4' : ''} gAlbedo = vec4(${al ? this._getData(al) : 'vec3(.5, .5, .5)'}, 1.);
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? 'vec4' : ''} gNormal = vec4(normalize(toTangentSpace * ((${normal ? this._getData(normal) : 'vec3(.5, .5, 1.)'} * 2.0)- 1.0)), 1.);
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? 'vec4' : ''} gBehaviour =  vec4(${ao ? this._getDataBehaviour(ao) : '1.'},${roughness ? this._getDataBehaviour(roughness) : '1.'},${metallic ? this._getDataBehaviour(metallic) : '0.'}, 1.);
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? `float opacity = ${opacity ? this._getDataBehaviour(opacity) : '1.'};` : ''}
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? `float refraction = ${refraction ? this._getDataBehaviour(refraction) : '0.'};` : ''}
            ${this.shadingType !== MATERIAL_RENDERING_TYPES.DEFERRED ? 'vec4' : ''} gEmissive = vec4(${emissive ? this._getData(emissive) : 'vec3(.0)'}, 1.);
        `
        else if (worldOffset)
            return `
                gl_Position += ${worldOffset.name}; 
            `
        else
            return ''
    }
}

