import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";
import MATERIAL_TYPES from "../../templates/MATERIAL_TYPES";

export default class Material extends Node {
    albedo
    metallic
    height
    roughness
    normal
    ao
    materialVariant = MATERIAL_TYPES.OPAQUE

    constructor() {
        super(
            [
                {label: 'Albedo', key: 'albedo', accept: [TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Metallic', key: 'metallic', accept: [TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Displacement', key: 'height', accept: [TYPES.OBJECT, TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Roughness', key: 'roughness', accept: [TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Normal', key: 'normal', accept: [TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Ambient occlusion', key: 'ao', accept: [TYPES.TEXTURE, TYPES.COLOR]},

                {label: 'Refraction', key: 'refraction', accept: [TYPES.NUMBER], disabled: true},
                {label: 'Emissive', key: 'emissive', accept: [TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Opacity', key: 'opacity', accept: [TYPES.NUMBER], disabled: true},

                {label: 'Subsurface', key: 'subsurface', accept: [TYPES.TEXTURE, TYPES.COLOR], disabled: true},
                // {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE, TYPES.COLOR], disabled: }
            ]);

        this.name = 'Material'
    }

    get type() {
        return NODE_TYPES.RESPONSE
    }

    set variant(d) {
        this.materialVariant = d
        this.inputs = this.inputs.map(i => {
            if (this.materialVariant === MATERIAL_TYPES.TRANSPARENT && (i.key === 'refraction' || i.key === 'opacity'))
                return {...i, disabled: false}
            else if (i.key === 'refraction' || i.key === 'opacity')
                return {...i, disabled: true}
            else
                return i
        })
    }

    get variant() {
        return this.materialVariant
    }

    compile(items) {
        return new Promise(resolve => {
            items.forEach(i => {
                this[i.key] = typeof i.data === 'string' ? (i.data.includes('data:image/png') ? i.data : ImageProcessor.colorToImage(i.data)) : i.data
            })

            this.ready = true
            resolve()
        })
    }
}