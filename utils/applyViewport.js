import {IDS} from "../../../services/hooks/useVisualizer";
import MaterialInstance from "../../../services/engine/elements/instances/MaterialInstance";
import EVENTS from "../../../services/utils/misc/EVENTS";

const MAT_ID = 'MAT-0'
export default function applyViewport(materialObject, engine, load) {
    if (engine.gpu && materialObject) {

        load.pushEvent(EVENTS.LOADING_MATERIAL)
        const sphere = engine.entities.find(e => e.id === IDS.SPHERE)
        if (sphere) {

            const newMaterial = new MaterialInstance(engine.gpu, MAT_ID)
            console.log(materialObject)
            newMaterial.initializeTextures(
                materialObject.albedo,
                materialObject.metallic,
                materialObject.roughness,
                materialObject.normal,
                materialObject.height,
                materialObject.ao
            ).then(() => {
                engine.setMaterial(newMaterial)
                load.finishEvent(EVENTS.LOADING_MATERIAL)
            })
        } else
            load.finishEvent(EVENTS.LOADING_MATERIAL)

    }else
        load.finishEvent(EVENTS.LOADING_MATERIAL)
}
