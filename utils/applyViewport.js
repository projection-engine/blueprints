import {IDS} from "../../../services/hooks/useMinimalEngine";
import MaterialInstance from "../../../services/engine/instances/MaterialInstance";
import EVENTS from "../../../services/utils/misc/EVENTS";

export default function applyViewport(materialObject, engine, load) {
    if (engine.gpu && materialObject) {

        load.pushEvent(EVENTS.LOADING_MATERIAL)
        const sphere = engine.entities.find(e => e.id === IDS.SPHERE)
        if (sphere) {

            console.log(engine.material, materialObject)
            if (engine.material === undefined) {
                const newMaterial = new MaterialInstance(engine.gpu, IDS.MATERIAL, undefined, undefined, undefined, materialObject.variant)
                newMaterial.initializeTextures(
                    materialObject
                ).then(() => {
                    engine.setMaterial(newMaterial)
                    load.finishEvent(EVENTS.LOADING_MATERIAL)
                })
            } else {
                engine.material.initializeTextures(
                    materialObject,
                    true
                )
                load.finishEvent(EVENTS.LOADING_MATERIAL)
            }

        } else
            load.finishEvent(EVENTS.LOADING_MATERIAL)

    } else
        load.finishEvent(EVENTS.LOADING_MATERIAL)
}
