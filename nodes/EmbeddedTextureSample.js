import Node from "../templates/Node"
import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../templates/NODE_TYPES"

export const TEXTURE_TYPES = {
    RGB: "RGB",
    RGBA: "RGBA",
    SRGB8_ALPHA8: "SRGB8_ALPHA8"
}
export default class EmbeddedTextureSample extends Node {
    texture = ""
    yFlip = false
     
    format = {
        format: TEXTURE_TYPES.RGB,
        internalFormat: TEXTURE_TYPES.RGB 
    }

    get ft() {
        return this.format.label
    }

    set ft(data) {
        switch (data) {
        case "RGB":
            this.format = {
                format: TEXTURE_TYPES.RGB,
                internalFormat: TEXTURE_TYPES.RGB,
                label: data
            }
            break
        case "RGBA":
            this.format = {
                label: data,
                format: TEXTURE_TYPES.RGBA,
                internalFormat: TEXTURE_TYPES.RGBA
            }
            break
        case "SRGBA":
            this.format = {
                label: data,
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
                key: "ft",
                type: DATA_TYPES.OPTIONS,
                options: [
                    {label: "RGB", data: "RGB"},
                    {label: "RGBA", data: "RGBA"},
                    {label: "sRGBA", data: "SRGBA"}
                ]
            },
            { key: "yFlip", type: DATA_TYPES.CHECKBOX},
            { key: "texture", type: DATA_TYPES.TEXTURE},
            { key: "uv", accept: [DATA_TYPES.VEC2]},
        ], [{key: "rgb", type: DATA_TYPES.VEC3, disabled: true}])
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionInstance() {
        return ""
    }

    async getInputInstance(index, uniforms, uniformData) {
        this.uniformName = `sampler${index}`
        
        try {
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                value: this.texture.registryID,
                type: DATA_TYPES.TEXTURE,
                format: {...this.format, yFlip: this.yFlip}
            })
            uniformData.push({
                key: this.uniformName,
                data: this.texture,
                type: DATA_TYPES.TEXTURE,
                format: this.format,
                yFlip: this.yFlip
            })
        } catch (error) {
            alert.pushAlert("Error compiling texture", "error")
        }
        return `uniform sampler2D sampler${index};`
    }

    getFunctionCall({uv}, index, outputs) {
        const samplerName = this.name + "_" + index + "_S"
        let response = [
            `vec4 ${samplerName} = texture(${this.uniformName}, ${uv !== undefined ? uv.name : "texCoord"});`
        ]
        outputs.forEach(o => {
            if (o !== "sampler") {
                if (!this[o]) {
                    this[o] = o + `${index}`
                    const outputKey = this.output.find(oo => oo.key === o)
                    response.push(`${outputKey.type} ${this[o]} = ${samplerName}.${o};`)
                }
            } else
                this[o] = o + `${index}`
        })

        return response.join("\n")
    }
}