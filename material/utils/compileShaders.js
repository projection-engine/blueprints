import compiler from "../compiler/compiler";
import MaterialInstance from "../../../../engine/instances/MaterialInstance";
import {IDS} from "../../../../extension/useMinimalEngine";
import {trimString} from "../../../../engine/instances/ShaderInstance";

export default async function compileShaders(setAlert, hook,setStatus ){
    setAlert({message: 'Compiling shaders', type: 'info'})
    hook.setImpactingChange(false)
    const {
        shader,
        vertexShader,
        uniformData,
        settings,
        info,
        cubeMapShader
    } = await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem)

    if (shader) {
        const prev = hook.engine.material
        let promise, newMat
        if (!prev)
            promise = new Promise(resolve => {
                newMat = new MaterialInstance(hook.engine.gpu, vertexShader, shader, uniformData, settings, (shaderMessage) => resolve(shaderMessage), IDS.MATERIAL, cubeMapShader.code)
            })
        else {
            newMat = prev
            promise = new Promise(resolve => {
                newMat.shader = [shader, vertexShader, uniformData, (shaderMessage) => resolve(shaderMessage), settings]
                newMat.cubeMapShader = [cubeMapShader.code, vertexShader]
            })
        }
        const message = await promise
        const shaderSplit = trimString(shader).split(';')
        let parsed = []
        setStatus({
            ...{
                ...message,
                messages:
                    message.messages
                        .map(m => m.split('ERROR'))
                        .flat()
                        .map(m => {
                            const data = {lines: []}
                            if (m.length > 0) {
                                const match = m.match(/:\s([0-9]+):([0-9]+)/gm),
                                    matchS = m.match(/:\s([0-9]+):([0-9]+)/m)
                                if (matchS) {
                                    let s = matchS[0].split('')
                                    s.shift()
                                    const [start, end] = s.join('').split(':')
                                    if (!parsed.includes(end)) {

                                        data.lines = shaderSplit.slice(end - 9, end - 8)
                                        parsed.push(end)
                                        data.error = 'ERROR' + m
                                        data.label = 'ERROR' + match[0]
                                        return data
                                    }
                                    return undefined
                                }
                            } else
                                return undefined
                        })
                        .filter(e => e)
            },
            info
        })
        if (!message.hasError)
            hook.engine.setMaterial(newMat)
    }
}