import Node from "../../../components/Node";
import COMPONENTS from "../../../../../engine/templates/COMPONENTS";
import NODE_TYPES from "../../../components/NODE_TYPES";
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES";

const toDeg = 57.29
export default class SetTransformationRelativeOrigin extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'Translation', key: 't', accept: [DATA_TYPES.VEC3]},
            {label: 'Rotation', key: 'r', accept: [DATA_TYPES.VEC4, DATA_TYPES.VEC3]},
            {label: 'Scale', key: 's', accept: [DATA_TYPES.VEC3]},
            {label: 'Origin', key: 'o', accept: [DATA_TYPES.VEC3]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION}
        ]);
        this.name = 'SetTransformationRelativeOrigin'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({t, r, s, o, entity}, index) {
        const tempRotation = 'tempSTRORot' + index
        const tempMatrix = 'tempSTROM' + index
        if (t && r && s && o && entity)
            return `
                let ${tempRotation} = ${r.name}
                if (r.length === 3)
                    ${tempRotation} = params.glMatrix.quat.fromEuler([], ${r.name}[0] * 57.29, ${r.name}[1] * 57.29, ${r.name}[2] * 57.29)
                
                const ${tempMatrix} = params.glMatrix.mat4.fromRotationTranslationScaleOrigin([], ${tempRotation}, ${t.name}, ${s.name}, ${o.name})
                
               ${entity.name}.components[params.COMPONENTS.TRANSFORM].translation = params.glMatrix.mat4.getTranslation([], ${tempMatrix})
               ${entity.name}.components[params.COMPONENTS.TRANSFORM].scaling = params.glMatrix.mat4.getScaling([], ${tempMatrix})
               ${entity.name}.components[params.COMPONENTS.TRANSFORM].rotationQuat = params.glMatrix.mat4.getRotation([], ${tempMatrix})
            `
        return ''
    }

}