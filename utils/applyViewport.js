import {IDS} from "../../mesh/hook/useVisualizer";
import MaterialInstance from "../../../services/engine/renderer/elements/MaterialInstance";
import Texture from "../../../services/engine/renderer/elements/Texture";
import {ENTITY_ACTIONS} from "../../../services/engine/ecs/utils/entityReducer";
import MaterialComponent from "../../../services/engine/ecs/components/MaterialComponent";
import EVENTS from "../../../pages/project/utils/misc/EVENTS";

const MAT_ID = 'MAT-0'
export default function applyViewport(materialObject, engine, load) {
    if (engine.gpu) {
        const sphere = engine.entities.find(e => e.id === IDS.SPHERE)

        if (sphere) {

            const gpu = engine.gpu
            let mat = {}


            if (materialObject.albedo)
                mat.albedo = new Texture(materialObject.albedo, false, gpu, ...[, ,], true)
            if (materialObject.metallic)
                mat.metallic = new Texture(materialObject.metallic, false, gpu, gpu.RGB, gpu.RGB, true)
            if (materialObject.roughness)
                mat.roughness = new Texture(materialObject.roughness, false, gpu, gpu.RGB, gpu.RGB, true)
            if (materialObject.normal)
                mat.normal = new Texture(materialObject.normal, false, gpu, gpu.RGB, gpu.RGB, true)
            if (materialObject.height)
                mat.height = new Texture(materialObject.height, false, gpu, gpu.RGB, gpu.RGB, true)
            if (materialObject.ao)
                mat.ao = new Texture(materialObject.ao, false, gpu, gpu.RGB, gpu.RGB, true)

            engine.setMaterials([
                new MaterialInstance(
                    gpu,
                    MAT_ID,
                    mat.albedo,
                    mat.metallic,
                    mat.roughness,
                    mat.normal,
                    mat.height,
                    mat.ao
                )
            ])
            sphere.components.MaterialComponent.materialID = MAT_ID
            engine.dispatchEntities({
                type: ENTITY_ACTIONS.UPDATE_COMPONENT,
                payload: {
                    entityID: sphere.id,
                    key: MaterialComponent.prototype.constructor.name,
                    data: sphere.components.MaterialComponent
                }
            })


        }
        load.finishEvent(EVENTS.LOADING_MATERIAL)
    }
}