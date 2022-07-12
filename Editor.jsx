import React, {useId, useMemo, useState} from "react"
import useShortcuts from "./hooks/useShortcuts"
import styles from "./styles/MaterialView.module.css"
import Available from "./components/Available"
import {allNodes} from "./templates/AllNodes"
import ResizableBar from "../../../components/resizable/ResizableBar"
import Board from "./components/Board"
import VerticalTabs from "../../../components/vertical-tab/VerticalTabs"
import BoardSettings from "./components/BoardSettings"
import NodeEditor from "./components/NodeEditor"
import CompilationStatus from "./components/CompilationStatus"
import PropTypes from "prop-types"
import ShaderEditor from "./ShaderEditor"
import save from "./utils/save"


export default function Editor(props) {
    const {currentMaterial, hook, submitPackage, registryID} = props
    const internalID = useId()
    const [openSideBar, setOpenSideBar] = useState(true)
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof ShaderEditor), [hook.nodes])


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
                                <BoardSettings/>
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
Editor.propTypes = {
    currentMaterial: PropTypes.object,
    hook: PropTypes.object, submitPackage: PropTypes.func,
    registryID: PropTypes.string,
    materials: PropTypes.array, setMaterials: PropTypes.func
}