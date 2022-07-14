import React, {useId, useMemo, useState} from "react"
import useShortcuts from "../hooks/useShortcuts"
import styles from "../styles/MaterialView.module.css"
import Available from "./Available"
import {availableNodes} from "../templates/availableNodes"
import ResizableBar from "../../../../components/resizable/ResizableBar"
import Board from "./Board"
import VerticalTabs from "../../../../components/vertical-tab/VerticalTabs"
import BoardSettings from "./BoardSettings"
import NodeEditor from "./NodeEditor"
import CompilationStatus from "./CompilationStatus"
import PropTypes from "prop-types"
import ShaderEditor from "../ShaderEditor"

export default function Editor(props) {
    const hook = props.hook
    const internalID = useId()
    const [openSideBar, setOpenSideBar] = useState(true)
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof ShaderEditor), [hook.nodes])

    useShortcuts(
        hook,
        () => window.blueprints.save(hook,  hook.openFile.registryID).catch(),
        internalID
    )

    return (
        <div className={styles.wrapper} id={internalID}>
            <Available
                allNodes={availableNodes}
                styles={{
                    width: "250px"
                }}
            />
            <ResizableBar type={"width"}/>
            <div className={styles.boardAvailable}>
                <Board
                    allNodes={availableNodes}
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
                            content: <BoardSettings/>
                        },
                        {
                            label: "Node",
                            content: (
                                <NodeEditor
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
    hook: PropTypes.object,
}