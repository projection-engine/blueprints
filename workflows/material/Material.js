import Response from "../../templates/Response";
import {TYPES} from "../../templates/TYPES";

export default class Material extends Response {
    albedo
    metallic
    height
    roughness
    normal
    ao

    constructor() {
        super(
            [
                {label: 'Albedo', key: 'albedo', accept: [ TYPES.TEXTURE]},
                {label: 'Metallic', key: 'metallic',  accept: [ TYPES.TEXTURE]},
                {label: 'Height', key: 'height', accept: [ TYPES.TEXTURE]},
                {label: 'Roughness', key: 'roughness',  accept: [ TYPES.TEXTURE]},
                {label: 'Normal', key: 'normal',  accept: [ TYPES.TEXTURE]},
                {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE]}
            ]);

        this.name = 'Material'
    }
    compile(items) {
        console.log(items)
        return new Promise(resolve => {
            items.forEach(i => {
                this[i.key] = i.data
            })

            this.ready = true
            resolve()
        })
    }
}