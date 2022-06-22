import Make from "./Make"
import compiler from "./compiler/compiler"
import React from "react"
import {Icon} from "@f-ui/core"

export default function options(compileShaders, hook, submitPackage, mat) {
    return [
        {
            label: "Compile",
            icon: <Icon  styles={{fontSize: "1.2rem"}}>code</Icon>,
            onClick: () => compileShaders()
        },
        {divider: true},
        {
            label: "Save",
            disabled: !hook.changed,
            group: "b",
            icon: <Icon  styles={{fontSize: "1.2rem"}}>save</Icon>,
            onClick: async () => {
                const response = await Make(
                    hook,
                    await compiler(hook.nodes, hook.links, window.fileSystem)
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
            icon: <Icon  styles={{fontSize: "1.2rem"}}>save_alt</Icon>,
            onClick: async () => {
                const response = await Make(hook, await compiler(hook.nodes, hook.links, window.fileSystem))
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
            icon: <Icon
                styles={{fontSize: "1.2rem"}}>{hook.realTime ? "live_tv" : "tv_off"}</Icon>,
            onClick: () => hook.setRealTime(!hook.realTime)
        },]
}