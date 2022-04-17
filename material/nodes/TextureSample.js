import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";
import ImageProcessor from "../../../../engine/utils/image/ImageProcessor";


export const TEXTURE_TYPES = {
    RGB: 'RGB',
    RGBA: 'RGBA',
    SRGB8_ALPHA8: 'SRGB8_ALPHA8'
}
export default class TextureSample extends Node {
    texture = {}
    yFlip = false

    format = {
        format: TEXTURE_TYPES.RGB,
        internalFormat: TEXTURE_TYPES.RGB,

        label: 'RGB'
    }

    get ft() {
        return this.format.label
    }

    set ft(data) {
        switch (data) {
            case 'RGB':
                this.format = {
                    format: TEXTURE_TYPES.RGB,
                    internalFormat: TEXTURE_TYPES.RGB,
                    label: data
                }
                break
            case 'RGBA':
                this.format = {
                    format: TEXTURE_TYPES.RGBA,
                    internalFormat: TEXTURE_TYPES.RGBA
                }
                break
            case 'SRGBA':
                this.format = {
                    format: TEXTURE_TYPES.RGBA,
                    internalFormat: TEXTURE_TYPES.SRGB8_ALPHA8
                }
                break
            default:
                break
        }
    }

    constructor() {
        super([
            {
                label: 'Texture format',
                key: 'format',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: 'RGB', data: 'RGB'},
                    {label: 'RGBA', data: 'RGBA'},
                    {label: 'sRGBA', data: 'SRGBA'}
                ]
            },

            {
                label: 'Flip Y',
                key: 'yFlip',
                type: DATA_TYPES.OPTIONS,
                options: [
                    {
                        label: 'Yes', data: true
                    },
                    {
                        label: 'No', data: false
                    },
                ]
            },

            {label: 'Texture', key: 'texture', type: DATA_TYPES.TEXTURE},
            {label: 'UV', key: 'uv', accept: [DATA_TYPES.VEC2]},
        ], [
            {label: 'Sampler', key: 'sampler', type: DATA_TYPES.TEXTURE},
            {label: 'RGB', key: 'rgb', type: DATA_TYPES.VEC3},
            {label: 'R', key: 'r', type: DATA_TYPES.FLOAT, color: 'red'},
            {label: 'G', key: 'g', type: DATA_TYPES.FLOAT, color: 'green'},
            {label: 'B', key: 'b', type: DATA_TYPES.FLOAT, color: 'blue'},
            {label: 'Alpha', key: 'a', type: DATA_TYPES.FLOAT, color: 'white'}
        ]);

        this.name = 'TextureSample'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index, uniforms, uniformData, fileSystem) {
        this.uniformName = `sampler${index}`
        if (this.texture?.registryID) {
            try {
                const res = await fileSystem.readRegistryFile(this.texture?.registryID)
                if (res) {
                    const file = await fileSystem.readFile(fileSystem.path + '\\assets\\' + res.path, true)
                    uniforms.push({
                        label: this.name,
                        key: this.uniformName,
                        value: this.texture.registryID,
                        type: DATA_TYPES.TEXTURE,
                        format: {...this.format, yFlip: this.yFlip}
                    })
                    uniformData.push({

                        key: this.uniformName,
                        data: file,
                        type: DATA_TYPES.TEXTURE,
                        format: this.format,
                        yFlip: this.yFlip
                    })
                } else
                    uniformData.push({
                        key: this.uniformName,
                        data: await ImageProcessor.colorToImage('rgba(255, 128, 128, 1)', 32),
                        type: DATA_TYPES.TEXTURE,
                        format: this.format
                    })
            } catch (error) {
                console.trace(error)
            }
        } else
            uniformData.push({
                key: this.uniformName,
                data: await ImageProcessor.colorToImage('rgba(255, 128, 128, 1)', 32),
                type: DATA_TYPES.TEXTURE,
                format: this.format
            })
        return `uniform sampler2D sampler${index};`
    }

    // texture and uv = {name: variable name, value: variable value if static}
    getFunctionCall({uv}, index, outputs, body) {
        let response = []
        outputs.forEach(o => {
            if (o !== 'sampler') {
                if (!this[o]) {
                    this[o] = o + `${index}`
                    const outputKey = this.output.find(oo => oo.key === o)
                    response.push(`${outputKey.type} ${this[o]} = texture(${this.uniformName}, ${uv !== undefined ? uv.name : 'texCoord'}).${o};`)
                }
            } else
                this[o] = o + `${index}`
        })

        return response.join('\n')
    }
}