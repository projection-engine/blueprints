import Board from "./components/Board"
import styles from "./styles/MaterialView.module.css"
import React, {useContext, useEffect, useId, useMemo, useRef, useState} from "react"
import PropTypes from "prop-types"
import ResizableBar from "../../../components/resizable/ResizableBar"
import Available from "./components/Available"
import NodeEditor from "./components/NodeEditor"
import {allNodes} from "./utils/AllNodes"
import useMaterialView from "./hooks/useMaterialView"
import CompilationStatus from "./components/CompilationStatus"
import compileShaders from "./utils/compileShaders"
import useShortcuts from "./hooks/useShortcuts"
import VerticalTabs from "../../../components/vertical-tab/VerticalTabs"
import Make from "./utils/Make"
import compiler from "./utils/compiler/compiler"
import BlueprintProvider from "../../providers/BlueprintProvider"
import Header from "../../../components/view/components/Header"
import {Button, Dropdown, DropdownOption, DropdownOptions, Icon} from "@f-ui/core"
import QuickAccessProvider from "../../providers/QuickAccessProvider"
import COMPONENTS from "../../engine/templates/COMPONENTS"
import BoardSettings from "./components/BoardSettings"

async function save(hook, submitPackage, registryID, currentMaterial){
    const response = await Make(
        hook,
        await compiler(hook.nodes, hook.links, window.fileSystem)
    )
    submitPackage(
        registryID,
        response.data,
        currentMaterial
    )
    hook.setChanged(false)
    hook.setImpactingChange(false)
}
export default function ShaderEditor(props) {
    const [openFile, setOpenFile] = useState({})
    const hook = useMaterialView(openFile)
    const {
        selectedEntity,
        materials,
        setMaterials,
        submitPackage
    } = useContext(BlueprintProvider)
    const quickAccess = useContext(QuickAccessProvider)
    useEffect(() => {
        if(selectedEntity && selectedEntity.components[COMPONENTS.MATERIAL] && !openFile.registryID){
            const mID = selectedEntity.components[COMPONENTS.MATERIAL].materialID
            const found = quickAccess.materials.find(m => m.registryID === mID)

            alert.pushAlert("Editing " + found.name, "info")
            if(found)
                setOpenFile(found)
        }
    }, [selectedEntity])
    const currentMaterial = useMemo(() => {
        return materials.find(m => m.id === openFile.registryID)
    }, [materials, openFile.registryID])

    useEffect(() => {
        if(Object.values(openFile).length === 0 && quickAccess.materials[0])
            setOpenFile(quickAccess.materials[0])
    }, [])
    const internalID=  useId()

    return (
        <>
            <Header {...props} title={"Shader Editor"} icon={"texture"} orientation={"horizontal"}>
                <div className={styles.options}>
                    <Dropdown className={styles.button} variant={"outlined"} styles={{marginRight: "16px"}}>
                        <div className={styles.icon}/>
                        {openFile.name ? openFile.name : ""}
                        <DropdownOptions>
                            {quickAccess.materials.map((m, i) => (
                                <React.Fragment key={internalID + "-material-" + i}>
                                    <DropdownOption option={{
                                        label: m.name,
                                        onClick: () => setOpenFile(m)
                                    }}/>
                                </React.Fragment>
                            ))}
                        </DropdownOptions>
                    </Dropdown>
                    <Button disabled={!openFile.registryID || !hook.changed} className={styles.button}  variant={"outlined"} onClick={() => save(hook, submitPackage, openFile.registryID, currentMaterial).catch()}>
                        <Icon styles={{fontSize: "1rem"}}>save</Icon>
                        Save
                    </Button>
                    <Button
                        disabled={!openFile.registryID}
                        className={styles.button}  variant={"outlined"} onClick={() => {
                            compileShaders(
                                hook,  
                                currentMaterial, 
                                (newMat) => {
                                    setMaterials(prev => {
                                        return [...prev].map(m => {
                                            if(m.id === openFile.registryID)
                                                return newMat
                                            return m
                                        })
                                    })
                                }).catch()
                        }}>
                        <Icon styles={{fontSize: "1rem"}}>code</Icon>
                        Compile
                    </Button>
                </div>
            </Header>
            {props.hidden ? null : <Editor currentMaterial={currentMaterial} hook={hook} submitPackage={submitPackage} registryID={openFile.registryID} materials={materials} setMaterials={setMaterials}/>}
        </>
    )
}

ShaderEditor.propTypes={
    hidden: PropTypes.bool,
    switchView: PropTypes.func,
    orientation: PropTypes.string,
}




function Editor(props){
    const {currentMaterial, hook, submitPackage, registryID, materials, setMaterials} = props
    const internalID = useId()
    const [openSideBar, setOpenSideBar] = useState(true)
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof ShaderEditor), [hook.nodes])
    const [grid, setGrid] = useState(1)
    const init = useRef(false)

    useEffect(() => {
        if (hook.realTime && (!init.current && hook.links.length > 0 || hook.impactingChange)) {
            compileShaders(hook,  currentMaterial, (newMat) => {
                setMaterials(prev => {
                    return [...prev].map(m => {
                        if(m.id === registryID)
                            return newMat
                        return m
                    })
                })
            }).catch()
            init.current = true
        }
    }, [hook.impactingChange, hook.links, materials, hook.realTime])
    useShortcuts(
        hook,
        () => save(hook, submitPackage, registryID, currentMaterial).catch(),
        internalID
    )


    return (
        <div className={styles.wrapper} id={internalID}>
            <Available
                allNodes={allNodes}
                styles={{
                    width: "250px"
                }}
            />
            <ResizableBar type={"width"}/>
            <div className={styles.boardAvailable}>
                <Board
                    grid={grid}
                    scale={hook.scale} setScale={hook.setScale}
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
                            label: "Board",
                            content: (
                                <BoardSettings
                                    setScale={hook.setScale}
                                    scale={hook.scale}
                                    setGrid={setGrid}
                                    grid={grid}
                                />
                            )
                        },
                        {
                            label: "Node",
                            content: (
                                <NodeEditor
                                    material={currentMaterial}
                                    hook={hook}
                                    selected={hook.selected.length === 0 && fallbackSelected ? fallbackSelected.id : hook.selected[0]}
                                />
                            )
                        },
                        {
                            label: "Status",
                            content: (
                                <CompilationStatus status={hook.status}/>
                            )
                        }
                    ]}
                />

            </div>
        </div>
    )
}
Editor.propTypes={
    currentMaterial: PropTypes.object,
    hook: PropTypes.object, submitPackage: PropTypes.func,
    registryID: PropTypes.string,
    materials: PropTypes.array, setMaterials: PropTypes.func
}