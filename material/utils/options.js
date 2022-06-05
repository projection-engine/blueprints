import Make from "./Make"
import compiler from "./compiler/compiler"
import React from "react"

export default function options(compileShaders, hook, submitPackage, mat) {
    return [
        {
            label: "Compile",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>code</span>,
            onClick: () => compileShaders()
        },
        {divider: true},
        {
            label: "Save",
            disabled: !hook.changed,
            group: "b",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>save</span>,
            onClick: async () => {
                const response = await Make(
                    hook,
                    await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem)
                )
                submitPackage(
                    response.data,
                    false,
                    response.preview,
                    false,
                    mat
                )
                hook.setChanged(false)
                hook.setImpactingChange(false)
            }
        },
        {
            label: "Save & close",
            disabled: !hook.changed,
            group: "b",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>save_alt</span>,
            onClick: async () => {
                const response = await Make(hook, await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem))
                submitPackage(
                    response.data,
                    true,
                    response.preview,
                    false,
                    mat
                )
                hook.setChanged(false)
                hook.setImpactingChange(false)
            }
        },
        {divider: true},
        {
            label: "Real time",

            icon: <span className={"material-icons-round"}
                style={{fontSize: "1.2rem"}}>{hook.realTime ? "live_tv" : "tv_off"}</span>,
            onClick: () => hook.setRealTime(!hook.realTime)
        },]
}