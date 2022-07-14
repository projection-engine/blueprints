import Make from "../libs/compiler/Make"
import compiler from "../libs/compiler/compiler"

export default async function save(hook, submitPackage, registryID, currentMaterial){
    const response = await Make(
        hook,
        await compiler(hook.nodes.filter(n => !n.isComment), hook.links)
    )
    submitPackage(
        registryID,
        response.data,
        currentMaterial
    )
    hook.setChanged(false)
    hook.setImpactingChange(false)
}