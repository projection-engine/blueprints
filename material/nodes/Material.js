import Node from '../../base/Node'
import {TYPES} from "../../base/TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import ImageProcessor from "../../../../services/workers/image/ImageProcessor";
import MATERIAL_TYPES from "../../../../services/engine/templates/MATERIAL_TYPES";

export default class Material extends Node {
    albedo
    metallic
    height
    roughness
    normal
    ao
    materialVariant = MATERIAL_TYPES.OPAQUE
    tilingX = 1
    tilingY = 1
    canBeDeleted = false

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

                {label: 'Subsurface', key: 'subSurface', accept: [TYPES.TEXTURE, TYPES.COLOR], disabled: true},
                {
                    label: 'Material type',
                    key: 'variant',
                    type: TYPES.OPTIONS,
                    options: [
                        {label: 'Opaque', data: MATERIAL_TYPES.OPAQUE},
                        {label: 'Transparent', data: MATERIAL_TYPES.TRANSPARENT},
                        {label: 'Terrain', data: MATERIAL_TYPES.TERRAIN}
                    ]
                },

                {label: 'UV tiling X', key: 'tilingX', type: TYPES.NUMBER},
                {label: 'UV tiling Y', key: 'tilingY', type: TYPES.NUMBER},
            ]);

        this.name = 'Material'
    }

    get type() {
        return NODE_TYPES.RESPONSE
    }

    set variant(d) {
        this.materialVariant = d
        this.inputs = this.inputs.map(i => {
            switch (d) {
                case MATERIAL_TYPES.TRANSPARENT:
                    if (this.materialVariant === MATERIAL_TYPES.TRANSPARENT && (i.key === 'refraction' || i.key === 'opacity'))
                        return {...i, disabled: false}
                    else if (i.accept !== undefined && i.accept.includes(TYPES.ATLAS))
                        return {...i, accept: i.accept.filter(e => e !== TYPES.ATLAS)}
                    return i
                case MATERIAL_TYPES.OPAQUE:
                    if (i.key === 'refraction' || i.key === 'opacity')
                        return {...i, disabled: true}
                    else if (i.accept !== undefined && i.accept.includes(TYPES.ATLAS))
                        return {...i, accept: i.accept.filter(e => e !== TYPES.ATLAS)}
                    return i
                case MATERIAL_TYPES.TERRAIN:
                    if (i.key === 'height' || i.key === 'ao' || i.key === 'emissive' || i.key === 'refraction' || i.key === 'opacity')
                        return {...i, disabled: true}
                    else if (i.accept !== undefined && !i.accept.includes(TYPES.ATLAS))
                        return {...i, accept: [...i.accept, TYPES.ATLAS]}
                    else
                        return i
                default:
                    return i
            }

        })
    }

    get variant() {
        return this.materialVariant
    }

    compile(items) {
        if (this.ready)
            return new Promise(r => r())
        return new Promise(async resolve => {
            let promises = []
            const filtered = items
                .filter(i => !i.key?.includes('tiling'))
            for (let j = 0; j < filtered.length; j++) {
                const i = filtered[j]
                const d = typeof i.data === 'string' ? (i.data.includes('data:image') ? i.data : await ImageProcessor.colorToImage(i.data)) : i.data
                let img
                this[i.key] = {}

                console.log(d)
                if (typeof d === "object") {
                    const imgKey = Object.keys(d).find(k => d[k].includes('data:image'))

                    img = d[imgKey]
                    delete d[imgKey]
                    this[i.key + 'Meta'] = d
                } else
                    img = d

                promises.push(new Promise(resolve1 => {
                    ImageProcessor.resizeImage(img, undefined, undefined, .12, .12).then(r => {
                        this[i.key].low = r
                        resolve1()
                    })
                }))
                promises.push(new Promise(resolve1 => {
                    ImageProcessor.resizeImage(img, undefined, undefined, .5, .5).then(r => {
                        this[i.key].medium = r
                        resolve1()
                    })
                }))


                this[i.key].high = img

            }

            Promise.all(promises)
                .then(() => {
                    this.tiling = [this.tilingX, this.tilingY]
                    this.ready = true
                    resolve()
                }).catch()
        })
    }
}