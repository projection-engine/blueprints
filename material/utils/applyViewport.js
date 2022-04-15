import {IDS} from "../../../../services/hooks/useMinimalEngine";
import MaterialInstance from "../../../../services/engine/instances/MaterialInstance";

export default function applyViewport(materialObject, engine,  setAlert) {
    setAlert({message: 'Refreshing material', type: 'info'})
    if (engine.gpu && materialObject) {
        const sphere = engine.entities.find(e => e.id === IDS.SPHERE)
        if (sphere) {
            if (engine.material !== undefined) {
                engine.gpu.deleteTexture(engine.material.albedo.texture)
                engine.gpu.deleteTexture(engine.material.metallic.texture)
                engine.gpu.deleteTexture(engine.material.roughness.texture)
                engine.gpu.deleteTexture(engine.material.ao.texture)
                engine.gpu.deleteTexture(engine.material.emissive.texture)
                engine.gpu.deleteTexture(engine.material.height.texture)
                engine.gpu.deleteTexture(engine.material.normal.texture)
            }
            const newMaterial = new MaterialInstance(engine.gpu, IDS.MATERIAL, undefined, undefined, undefined, materialObject.variant)
            newMaterial.initializeTextures(
                materialObject
            ).then(() => {
                engine.setMaterial(newMaterial)
            })


        }

    }
}
