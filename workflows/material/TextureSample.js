import Node from "../../templates/Node";
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class TextureSample extends Node {
    sample = {}
    uv = 1
    constructor() {
        super([
            {label: 'UV scale', key: 'uv',   accept: [TYPES.NUMBER]},
            {label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}
        ], [{label: 'Texture', type: TYPES.TEXTURE, key: 'sample'}]);
        this.name = 'Texture sample'
    }
    get type (){
        return NODE_TYPES.DATA
    }
    compile(_, fileSystem) {
        return new Promise(resolve => {
            fileSystem.readRegistryFile(this.sample?.registryID)
                .then(res => {
                    if(res)
                        fileSystem.readFile(fileSystem.path + '\\assets\\' + res.path)
                            .then(file => {
                                this.sample = file
                                this.ready = true
                                resolve()
                            })
                    else {
                        this.sample = ''
                        this.ready = true
                        resolve()
                    }
                })
        })
    }
}

