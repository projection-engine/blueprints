import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class Material extends Node {
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
                {label: 'Height', key: 'height', accept: [ TYPES.OBJECT, TYPES.TEXTURE ]},
                {label: 'Roughness', key: 'roughness',  accept: [ TYPES.TEXTURE]},
                {label: 'Normal', key: 'normal',  accept: [ TYPES.TEXTURE]},
                {label: 'Ambient occlusion', key: 'ao',  accept: [ TYPES.TEXTURE]}
            ]);

        this.name = 'Material'
    }

    get type (){
        return NODE_TYPES.RESPONSE
    }

    compile(items) {

        return new Promise(resolve => {
            items.forEach(i => {
                this[i.key] = i.data
            })

            this.ready = true
            resolve()
        })
    }
}