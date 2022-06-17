import Board from "./components/Board"
import s from "./styles/MaterialView.module.css"
import React, {useEffect, useMemo, useState} from "react"
import PropTypes from "prop-types"
import ResizableBar from "../../../components/resizable/ResizableBar"
import Available from "./components/Available"
import NodeEditor from "./components/NodeEditor"
import {allNodes} from "./utils/AllNodes"
import useMaterialView from "./hooks/useMaterialView"
import CompilationStatus from "./components/CompilationStatus"
import options from "./utils/options"
import compileShaders from "./utils/compileShaders"
import {Tab, Tabs} from "@f-ui/core"
import FileOptions from "./components/FileOptions"
import useShortcuts from "./hooks/useShortcuts"
import VerticalTabs from "../../../components/vertical-tab/VerticalTabs"
import CameraTab from "../viewport/components/CameraTab"
import ViewportTab from "../viewport/components/ViewportTab"
import Transform from "../component/components/Transform"
import COMPONENTS from "../../engine/templates/COMPONENTS"
import {updateTransform} from "../component/hooks/useForm"

export default function ShaderEditor(props) {
    const {registryID, name} = props
    const [scale, setScale] = useState(1)
    const [status, setStatus] = useState({})
    const hook = useMaterialView({registryID, name})
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof ShaderEditor), [hook.nodes])
    const [init, setInit] = useState(false)
    const [mat, setMat] = useState()
    const [open, setOpen] = useState(0)
    const [openSideBar, setOpenSideBar] = useState(false)

    useEffect(() => {
        if(props.engine.selectedEntity && mat && !status.hasError)
            hook.renderer.overrideMaterial = mat
        else
            hook.renderer.overrideMaterial = undefined
    }, [props.engine.selectedEntity, mat])


    useEffect(() => setInit(false), [props.open])
    useEffect(() => {
        if ((!init && hook.links.length > 0 || hook.impactingChange && hook.realTime) && props.engine.renderer) {
            compileShaders(hook, setStatus, mat, setMat).catch()
            setInit(true)
        }
    }, [hook.impactingChange, hook.realTime, hook.links, init])
    const optionsData = useMemo(() => options(() => compileShaders(hook, setStatus, mat, setMat).catch(), hook, props.submitPackage, mat), [hook.nodes, hook.links, props.engine.gpu, hook.changed, hook.impactingChange, hook.realTime])

    useShortcuts(hook, optionsData, registryID)

    return (
        <div style={{display: "flex", overflow: "hidden", height: "100%"}}>
            <FileOptions options={optionsData}/>
            <div className={s.wrapper} id={registryID + "-board"}>
                <Available
                    allNodes={allNodes}
                    styles={{
                        width: "250px"
                    }}
                />
                <ResizableBar type={"width"}/>
                <div className={s.boardAvailable}>
                    <Board
                        scale={scale} setScale={setScale}
                        allNodes={allNodes}
                        hook={hook}
                        selected={hook.selected}
                        setSelected={hook.setSelected}
                    />

                    <VerticalTabs
                        open={openSideBar}
                        setOpen={setOpenSideBar}
                        tabs={[
                            {
                                label: "Node",
                                content: (
                                    <NodeEditor
                                        hook={hook}
                                        engine={props.engine}
                                        selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}
                                    />
                                )
                            },
                            {
                                label: "Status",
                                content: (
                                    <CompilationStatus status={status}/>
                                )
                            }
                        ]}
                    />
                </div>

            </div>
        </div>
    )
}

ShaderEditor.propTypes = {
    submitPackage: PropTypes.func.isRequired,
    registryID: PropTypes.string,
    name: PropTypes.string,
    engine: PropTypes.object,
    open: PropTypes.bool
}