import Node from "../../../components/flow/Node";
import {TYPES} from "../templates/TYPES";
import ImageProcessor from "../../../services/workers/ImageProcessor";
import NODE_TYPES from "../templates/NODE_TYPES";

export default class ParallaxOcclusionMapping extends Node {
    sample = ''
    uv = 1

    constructor() {
        super(
            [
                {label: 'Height Map', key: 'sample', accept: [TYPES.TEXTURE]},
                {label: 'Layers', key: 'layers', accept: [TYPES.NUMBER]},
                {label: 'Height scale', key: 'heightScale', type: TYPES.NUMBER, max: .3, min: .05},
                {label: 'Height Map channel', key: 'channel', accept: [TYPES.VEC]}
            ],
            [{label: 'Parallax object', type: TYPES.OBJECT, key: 'response'}]
        );
        this.name = 'Parallax Occlusion Mapping'
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    compile(inputs) {
        if(this.ready)
            return new Promise(r => r())
        let texture = inputs.find(i => i.key === 'sample')?.data,
            layers = inputs.find(i => i.key === 'layers')?.data,
            heightMapChannel = inputs.find(i => i.key === 'channel')?.data,
            heightScale = inputs.find(i => i.key === 'heightScale')?.data
        return new Promise(resolve => {
            let indexMax = [1, 0, 0]

            if (heightMapChannel) {
                const max = Math.max(...heightMapChannel)
                if(max > 0) {
                    const i = heightMapChannel.indexOf(max)
                    indexMax[0] = 0
                    indexMax[i] = 1
                }
            }

            ImageProcessor.extractChannel([indexMax[0], indexMax[1], indexMax[2], 1], texture)
                .then(res => {
                    this.response = {
                        image: res,
                        layers: layers ? layers : 32,
                        heightScale: heightScale ? heightScale : .1
                    }
                    this.ready = true
                    resolve()
                })

        })
    }
}


