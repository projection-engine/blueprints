import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/ImageProcessor";
export const MATERIAL_VARIANTS = {
    OPAQUE: 0,
    TRANSPARENT: 1,
    TERRAIN: 2
}
export default class Material extends Node {
    albedo
    metallic
    height
    roughness
    normal
    ao
    _variant = MATERIAL_VARIANTS.OPAQUE

    constructor() {
        super(
            [
                {label: 'Albedo', key: 'albedo', accept: [ TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Metallic', key: 'metallic',  accept: [ TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Displacement', key: 'height', accept: [ TYPES.OBJECT, TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Roughness', key: 'roughness',  accept: [ TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Normal', key: 'normal',  accept: [ TYPES.TEXTURE, TYPES.COLOR]},
                {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE, TYPES.COLOR]},


                // {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE, TYPES.COLOR], disabled: },
                // {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE, TYPES.COLOR], disabled: },
                // {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE, TYPES.COLOR], disabled: }
            ]);

        this.name = 'Material'
    }

    get type (){
        return NODE_TYPES.RESPONSE
    }

    set variant(d){
        this._variant = d

    }
    get variant(){
        return this._variant
    }

    compile(items) {
        return new Promise(resolve => {
            items.forEach(i => {
                this[i.key] =  i.data?.includes('data:image/png') ? i.data : ImageProcessor.colorToImage(i.data)
            })

            this.ready = true
            resolve()
        })
    }
}