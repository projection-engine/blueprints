import compiler from "./compiler"
import MaterialInstance from "../../../../engine/instances/MaterialInstance"
import {trimString} from "../../../../engine/instances/ShaderInstance"

export default async function compileShaders(hook,mat, setMat ){
    alert.pushAlert("Compiling shaders", "info")
    hook.setImpactingChange(false)
    const {
        shader,
        vertexShader,
        uniformData,
        settings,
        info,
        cubeMapShader
    } = await compiler(hook.nodes.filter(n => !n.isComment), hook.links)

    if (shader) {
        const onOverride = mat
        let promise, newMat
        if (!onOverride)
            promise = new Promise(resolve => {
                newMat = new MaterialInstance({
                    vertex: vertexShader,
                    fragment: shader,
                    uniformData,
                    settings,
                        
                    onCompiled: (shaderMessage) => resolve(shaderMessage),
                    cubeMapShaderCode: cubeMapShader.code
                })
            })
        else {
            newMat = onOverride
            promise = new Promise(resolve => {
                newMat.shader = [shader, vertexShader, uniformData, (shaderMessage) => resolve(shaderMessage), settings]
                newMat.cubeMapShader = [cubeMapShader.code, vertexShader]
            })
        }
        const m = await promise
        const message = m ? m : {messages: []}
        const shaderSplit = trimString(shader).split(";")
        let parsed = []
        hook.setStatus({
            ...message,
            messages: message.messages
                .map(m => m.split("ERROR"))
                .flat()
                .map(m => {
                    const data = {lines: []}
                    if (m.length > 0) {
                        const match = m.match(/:\s([0-9]+):([0-9]+)/gm),
                            matchS = m.match(/:\s([0-9]+):([0-9]+)/m)
                        if (matchS) {
                            let s = matchS[0].split("")
                            s.shift()
                            const [, end] = s.join("").split(":")
                            if (!parsed.includes(end)) {
                                data.lines = shaderSplit.slice(end - 9, end - 8)
                                parsed.push(end)
                                data.error = "ERROR" + m
                                data.label = "ERROR" + match[0]
                                return data
                            }
                        }
                    }
                }).filter(e => e),
            info
        })
        setMat(newMat)

    }
}