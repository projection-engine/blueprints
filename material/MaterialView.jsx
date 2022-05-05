import Board from "../components/components/Board";

import s from './styles/MaterialView.module.css'
import {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../../../components/tabs/components/ControlProvider";
import ResizableBar from "../../../components/resizable/ResizableBar";
import Available from "../components/components/Available";
import compiler from "./compiler/compiler";
import NodeEditor from "./components/NodeEditor";
import MaterialViewport from "./components/MaterialViewport";
import {allNodes} from "./AllNodes";
import useMaterialView from "./hooks/useMaterialView";
import Make from "./utils/Make";
import Material from "./nodes/Material";

import MaterialInstance from "../../../engine/instances/MaterialInstance";
import {IDS} from "../../../engine/hooks/useMinimalEngine";
import CompilationStatus from "./components/CompilationStatus";
import {trimString} from "../../../engine/instances/ShaderInstance";


export default function MaterialView(props) {
    const [scale, setScale] = useState(1)
    const [status, setStatus] = useState({})

    const hook = useMaterialView(props.file, props.setAlert)

    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n instanceof Material)
    }, [hook.nodes])

    const controlProvider = useContext(ControlProvider)
    const compileShaders = () => {
        props.setAlert({message: 'Compiling shaders', type: 'info'})
        hook.setImpactingChange(false)

        compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem)
            .then(({shader, vertexShader, uniforms, uniformData, settings, info}) => {

                if (shader) {
                    const prev = hook.engine.material
                    let promise, newMat
                    if (!prev)
                        promise = new Promise(resolve => {
                            newMat = new MaterialInstance(hook.engine.gpu, vertexShader, shader, uniformData, settings, (shaderMessage) => resolve(shaderMessage), IDS.MATERIAL)
                        })
                    else {
                        newMat = prev
                        promise = new Promise(resolve => {
                            newMat.shader = [shader, vertexShader, uniformData, (shaderMessage) => resolve(shaderMessage), settings]
                        })
                    }
                    promise.then((message) => {
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
                    })
                }
            })
    }
    const [init, setInit] = useState(false)
    useEffect(() => {
        if ((!init && hook.links.length > 0 || hook.impactingChange && hook.realTime) && hook.engine.renderer) {
            if (!init)
                setInit(true)
            compileShaders()
        }
    }, [hook.impactingChange, hook.engine.renderer, hook.realTime, hook.links])
    useEffect(() => {
        controlProvider.setTabAttributes([
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
                        const response = await Make(hook, await compiler(hook.nodes, hook.links, hook.quickAccess.fileSystem))
                        props.submitPackage(
                            response.preview,
                            response.data,
                            false
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
                        props.submitPackage(
                            response.preview,
                            response.data,
                            true
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
                },],
            props.file.name,
            <span
                style={{fontSize: '1.2rem'}}
                className={`material-icons-round`}>texture</span>,
            (newTab) => {
                if (newTab === props.index)
                    hook.engine.setCanRender(true)
                else
                    hook.engine.setCanRender(false)
            },
            true,
            props.index
        )

    }, [hook.nodes, hook.links, hook.engine.gpu, hook.changed, hook.impactingChange, hook.realTime])

    return (
        <div className={s.wrapper} id={props.file.registryID + '-board'}>
            <div className={s.content}>
                <NodeEditor
                    hook={hook}
                    engine={hook.engine}
                    selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}/>
                <ResizableBar type={'height'}/>
                <CompilationStatus status={status}/>
            </div>
            <ResizableBar type={"width"}/>
            <div className={s.view}>
                <MaterialViewport engine={hook.engine} fileID={props.file.registryID}/>
                <ResizableBar type={'height'}/>
                <div className={s.boardAvailable}>
                    <Board
                        scale={scale} setScale={setScale}
                        allNodes={allNodes}
                        setAlert={props.setAlert}
                        hook={hook}
                        selected={hook.selected}
                        setSelected={hook.setSelected}
                    />
                    <Available allNodes={allNodes} canBeHidden={true}/>
                </div>
            </div>

        </div>
    )
}

MaterialView.propTypes = {
    index: PropTypes.number.isRequired,
    setAlert: PropTypes.func.isRequired,
    file: PropTypes.shape({
        registryID: PropTypes.string,
        name: PropTypes.string,
    }),
    submitPackage: PropTypes.func.isRequired,

}