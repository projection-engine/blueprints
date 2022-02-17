import {IDS} from "../../../services/hooks/useVisualizer";
import MaterialInstance from "../../../services/engine/renderer/elements/MaterialInstance";
import Texture from "../../../services/engine/renderer/elements/Texture";
import {ENTITY_ACTIONS} from "../../../services/engine/utils/entityReducer";
import MaterialComponent from "../../../services/engine/ecs/components/MaterialComponent";
import EVENTS from "../../../pages/project/utils/misc/EVENTS";
import getImagePromise from "../../../services/engine/utils/getImagePromise";

const MAT_ID = 'MAT-0'
export default function applyViewport(materialObject, engine, load) {
    if (engine.gpu) {
        load.pushEvent(EVENTS.LOADING_MATERIAL)
        const sphere = engine.entities.find(e => e.id === IDS.SPHERE)
        if (sphere) {
            const newMaterial = new MaterialInstance(engine.gpu, MAT_ID)
            newMaterial.initializeTextures(
                materialObject.albedo,
                materialObject.metallic,
                materialObject.roughness,
                materialObject.normal,
                materialObject.height,
                materialObject.ao
            ).then(() => {
                engine.setMaterials([
                  newMaterial
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
                load.finishEvent(EVENTS.LOADING_MATERIAL)
            })
        } else
            load.finishEvent(EVENTS.LOADING_MATERIAL)

    }
}
