import Board from "../components/components/Board";
import useScriptingView from "./hooks/useScriptingView";
import Available from "../components/components/Available";
import styles from '../components/styles/Board.module.css'
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../../router/components/ControlProvider";
import ResizableBar from "../../../../components/resizable/ResizableBar";
import useHotKeys from "../../../hooks/useHotKeys";
import {allNodes} from "./templates/AllNodes";
import NodeEditor from "./components/NodeEditor";
import Structure from "./components/Structure";
import mapper from "./compiler/mapper";
import getHotKeys from "./utils/getHotKeys";
import getAvailableNodes from "./utils/getAvailableNodes";

import EntityReference from "./nodes/utils/EntityReference";
import LoaderProvider from "../../../../components/loader/LoaderProvider";
import compiler from "./compiler/compiler";
import ScriptSystem from "../../../engine/systems/ScriptSystem";
import {AlertProvider} from "@f-ui/core";
import {ROUTER_TYPES} from "../../router/TabRouter";

const NAME='Level blueprint'

export default function LevelBlueprint(props) {
    const {submitPackage, engine, id} = props
    const alert = useContext(AlertProvider)
    const setAlert = ({type, message}) => {
        alert.pushAlert(message, type)
    }
    const load = useContext(LoaderProvider)
    const hook = useScriptingView(undefined, undefined, load, true)
    const ref = useRef()
    const wrapperRef = useRef()
    const controlProvider = useContext(ControlProvider)
    const [toCopy, setToCopy] = useState([])
    const [selectedVariable, setSelectedVariable] = useState()
    const [scale, setScale] = useState(1)

    useEffect(() => {
        if(hook.selected.length > 0)
        setSelectedVariable(undefined)
    }, [hook.selected])
    useEffect(() => {
        controlProvider.setTabAttributes(
            [
                {
                    label: 'Compile',
                    group: 'b',
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>check</span>,
                    onClick: async () => {
                        const e = await compiler(hook.nodes, hook.links, hook.variables, hook.quickAccess.fileSystem)
                        try{
                            ScriptSystem.parseScript(e)
                        }catch (err){
                            // TODO - SAVE ERROS AND DO ALERT
                        }
                    }
                },
                {
                    label: 'Save',
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
                    onClick: async () => {
                        hook.setChanged(false)
                        hook.setImpactingChange(false)
                        submitPackage(await mapper(hook, engine, {id: id, name: NAME}, true), false)
                    }
                },
                {
                    label: 'Save & close',
                    icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>,
                    onClick: async () => submitPackage(await mapper(hook, engine, {id: id, name: NAME}, true), true)
                }
            ],
            NAME,
            <span
                style={{fontSize: '1.2rem'}}
                className={`material-icons-round`}>foundation</span>,
            ROUTER_TYPES.LEVEL,
            id
        )

    }, [hook.nodes, hook.links, hook.variables, hook.groups, engine.entities])

    useHotKeys({
        focusTarget: id + '-board-wrapper',
        actions: getHotKeys(hook, props, toCopy, setToCopy, engine, {id: id, name: NAME}, true)
    })

    const availableNodes = useMemo(() => {
        return getAvailableNodes(hook)
    }, [hook.variables])

    return (
        <div className={styles.prototypeWrapper} ref={ref} id={id + '-board-wrapper'}>
            <Structure
                hook={hook}
                isLevelBlueprint={true}
                engine={engine}
                selectedVariable={selectedVariable}
                setSelectedVariable={setSelectedVariable}
                focusNode={(n) => {
                    let f = document.getElementById(n)?.parentNode
                    if (f) {
                        const transformation = f
                            .getAttribute('transform')
                            .replace('translate(', '')
                            .replace(')', '')
                            .split(' ')
                        wrapperRef.current.lastChild.scrollLeft = parseFloat(transformation[0]) - wrapperRef.current.lastChild.offsetWidth / 2 + 150
                        wrapperRef.current.lastChild.scrollTop = parseFloat(transformation[1]) - wrapperRef.current.lastChild.offsetHeight / 2
                        hook.setSelected([n])

                    }
                }}
            />
            <ResizableBar type={"width"}/>
            <div ref={wrapperRef} className={styles.prototypeWrapperBoard}>
                <Board
                    id={id}
                    allNodes={availableNodes}
                    setAlert={setAlert}
                    parentRef={ref}
                    onEmptyClick={() => setSelectedVariable(undefined)}
                    onDrop={(ev) => {
                        const dt = ev.dataTransfer.getData('text')
                        const entity = engine.entities.find(e => e.id === dt)

                        if (entity)
                            return [true, new EntityReference(dt, entity?.name, Object.keys(entity.components))]
                        else
                            return [true]
                    }}
                    hook={hook}
                    selected={hook.selected}
                    setSelected={hook.setSelected}
                    scale={scale}
                    setScale={setScale}
                />
            </div>
            <ResizableBar type={'width'}/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '275px',
                gap: '3px',
                overflow: 'hidden'
            }}>
                <NodeEditor
                    hook={hook}
                    selected={hook.selected}
                    selectedVariable={selectedVariable}
                />
                <Available allNodes={allNodes}/>
            </div>
        </div>
    )
}

LevelBlueprint.propTypes = {
    engine: PropTypes.object,
    id: PropTypes.string,
    submitPackage: PropTypes.func.isRequired
}