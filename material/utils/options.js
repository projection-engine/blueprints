import Make from "./Make";
import compiler from "../compiler/compiler";

export default function options(compileShaders, hook, submitPackage) {
    return [
        {
            label: 'Compile',
            icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>code</span>,
            onClick: () => compileShaders()
        },
        {
            label: 'Save',
            disabled: !hook.changed,
            group: 'b',
            icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
            onClick: async () => {
                const response = await Make(
                    hook,
                    await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem)
                )
                submitPackage(
                    response.data,
                    false,
                    response.preview,
                )
                hook.setChanged(false)
                hook.setImpactingChange(false)
            }
        },
        {
            label: 'Save & close',
            disabled: !hook.changed,
            group: 'b',
            icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>,
            onClick: async () => {
                const response = await Make(hook, await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem))
                submitPackage(

                    response.data,
                    true,
                    response.preview,
                )
                hook.setChanged(false)
                hook.setImpactingChange(false)
            }
        },
        {
            label: 'Real time',
            group: 'c',
            icon: <span className={'material-icons-round'}
                        style={{fontSize: '1.2rem'}}>{hook.realTime ? 'live_tv' : 'tv_off'}</span>,
            onClick: () => hook.setRealTime(!hook.realTime)
        },]
}