import Make from "./Make"
import compiler from "./compiler/compiler"

export default async function save(hook, submitPackage, registryID, currentMaterial){
    const response = await Make(
        hook,
        await compiler(hook.nodes, hook.links, window.fileSystem)
    )
    submitPackage(
        registryID,
        response.data,
        currentMaterial
    )
    hook.setChanged(false)
    hook.setImpactingChange(false)
}