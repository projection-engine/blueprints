import Node from '../../base/Node'
import {DATA_TYPES} from "../../base/DATA_TYPES";
import NODE_TYPES from "../../base/NODE_TYPES";


export default class TextureSample extends Node {
    texture = {}
    constructor() {
        super([
            {label: 'Texture', key: 'texture', type: DATA_TYPES.TEXTURE},
            {label: 'UV', key: 'uv', accept: [ DATA_TYPES.VEC2 ]},
        ], [
            {label: 'RGBA', key: 'rgba', type: DATA_TYPES.VEC4},
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

    getFunctionInstance(){
        return ''
    }
    getInputInstance(index, uniforms){
        this.uniformName = `sampler${index}`
        uniforms.push({
            label: this.name,
            key:  this.uniformName,
            type: DATA_TYPES.TEXTURE
        })
        return `uniform sampler2D sampler${index};`
    }
    // texture and uv = {name: variable name, value: variable value if static}
    getFunctionCall({uv}, index, outputs, body){
        let response = []
        outputs.forEach(o => {
            this[o] = o+`${index}`

            const outputKey = this.output.find(oo => oo.key === o)
            const hasSampledRGBA = body.find(b => {
                return b.includes('rgba' + index)
            })
            console.log(uv)
            if(!hasSampledRGBA)
                response.push( `${outputKey.type} ${this[o]} = texture(${this.uniformName}, ${uv !== undefined ?uv.name: 'texCoord'}).${o};`)
            else
                response.push(`${outputKey.type} ${this[o]} = rgba${index}.${o};`)
        })

        return response.join('\n')
    }
}