import Board from "../components/components/Board"
import useScriptingView from "./utils/useScriptingView"
import Available from "../components/components/Available"
import styles from "../components/styles/Board.module.css"
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react"
import PropTypes from "prop-types"
import ResizableBar from "../../../../components/resizable/ResizableBar"
import useHotKeys from "../../../utils/hooks/useHotKeys"
import {allNodes} from "./utils/AllNodes"
import NodeEditor from "./components/NodeEditor"
import Structure from "./components/Structure"
import mapper from "./utils/compiler/mapper"
import getHotKeys from "./utils/getHotKeys"
import getAvailableNodes from "./utils/getAvailableNodes"

import EntityReference from "./utils/nodes/utils/EntityReference"
import LoaderProvider from "../../../../components/loader/LoaderProvider"
import compiler from "./utils/compiler/compiler"
import ScriptSystem from "../../../engine/systems/ScriptSystem"
import {AlertProvider, Tab, Tabs} from "@f-ui/core"
import FileOptions from "../../../../components/file-options/FileOptions"

const NAME = "Level blueprint"

export default function ScriptView(props) {
    const {submitPackage, engine, id, isLevelBp} = props
    const alert = useContext(AlertProvider)
    const setAlert = ({type, message}) => {
        alert.pushAlert(message, type)
    }
    const load = useContext(LoaderProvider)
    const hook = useScriptingView(undefined, undefined, load, true)
    const ref = useRef()
    const wrapperRef = useRef()
    const [toCopy, setToCopy] = useState([])
    const [selectedVariable, setSelectedVariable] = useState()
    const [scale, setScale] = useState(1)
    const [openTab, setOpenTab] = useState(1)

    useEffect(() => {
        if (hook.selected.length > 0) setSelectedVariable(undefined)
    }, [hook.selected])

    const options = useMemo(() => {
        return [{
            label: "Compile",
            group: "b",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>check</span>,
            onClick: async () => {
                const e = await compiler(hook.nodes, hook.links, hook.variables, hook.quickAccess.fileSystem)
                ScriptSystem.parseScript(e)
            }
        }, {
            label: "Save",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>save</span>,
            onClick: async () => {
                hook.setChanged(false)
                hook.setImpactingChange(false)
                submitPackage(await mapper(hook, engine, {id: id, name: NAME}, isLevelBp), false)
            }
        }, {
            label: "Save & close",
            icon: <span className={"material-icons-round"} style={{fontSize: "1.2rem"}}>save_alt</span>,
            onClick: async () => submitPackage(await mapper(hook, engine, {id: id, name: NAME}, isLevelBp), true)
        }]
    }, [hook.nodes, hook.links, engine.gpu, hook.changed, hook.impactingChange, hook.realTime])
    useHotKeys({
        focusTarget: id + "-board",
        actions: getHotKeys(hook, setAlert, toCopy, setToCopy, () => options[1].onClick())
    })

    const availableNodes = useMemo(() => {
        return getAvailableNodes(hook)
    }, [hook.variables])
    const onDrop = useCallback((ev) => {
        const dt = ev.dataTransfer.getData("text")
        let toAdd = [], entities
        try{
            entities = JSON.parse(dt)
            entities.forEach(e => {
                const entity = engine.entities.find(ee => ee.id === e)

                if (entity) {
                    const newData =new EntityReference(e, entity?.name, Object.keys(entity.components))
                    toAdd.push(newData)
                }
            })
        }catch (err){
            toAdd = undefined
        }
        return {allow: true, entities: toAdd}
    }, [engine.entities])
    return (<div style={{display: "flex", overflow: "hidden", height: "100%"}}>
        <FileOptions options={options}/>
        <div className={styles.prototypeWrapper} ref={ref} id={id + "-board"}>
            <Structure
                hook={hook}
                engine={engine}
                setOpenTab={setOpenTab}
                selectedVariable={selectedVariable}
                setSelectedVariable={setSelectedVariable}
                focusNode={(n) => {
                    let f = document.getElementById(n)?.parentNode
                    if (f) {
                        const transformation = f
                            .getAttribute("transform")
                            .replace("translate(", "")
                            .replace(")", "")
                            .split(" ")
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
                    onDrop={onDrop}
                    hook={hook}
                    selected={hook.selected}
                    setSelected={hook.setSelected}
                    scale={scale}
                    setScale={setScale}
                />
            </div>
            <ResizableBar type={"width"}/>
            <Tabs open={openTab} setOpen={setOpenTab} className={styles.content}>
                <Tab label={"Variable editor"} disabled={!selectedVariable}>
                    <NodeEditor
                        hook={hook}
                        selected={hook.selected}
                        selectedVariable={selectedVariable}
                    />
                </Tab>
                <Tab label={"Available nodes"}>
                    <Available allNodes={allNodes}/>
                </Tab>
            </Tabs>
            
        </div>
    </div>)
}

ScriptView.propTypes = {
    engine: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string,
    submitPackage: PropTypes.func.isRequired,
    isLevelBp: PropTypes.bool
}