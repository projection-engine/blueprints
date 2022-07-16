import React, {useCallback, useId, useMemo, useState} from "react"
import useShortcuts from "../hooks/useShortcuts"
import styles from "../styles/ShaderEditor.module.css"
import Available from "./Available"
import {availableNodes} from "../templates/availableNodes"
import ResizableBar from "../../../../components/resizable/ResizableBar"
import Board from "./Board"
import VerticalTabs from "../../../../components/vertical-tab/VerticalTabs"

import AttributeEditor from "./AttributeEditor"
import CompilationStatus from "./CompilationStatus"
import PropTypes from "prop-types"
import ShaderEditor from "../ShaderEditor"
import cloneClass from "../../../engine/utils/cloneClass"
import UpdateNodeProvider from "../context/UpdateNodeProvider"

export default function Editor(props) {
    const hook = props.hook
    const internalID = useId()
    const [openSideBar, setOpenSideBar] = useState(true)
    const fallbackSelected = useMemo(() => hook.nodes.find(n => n instanceof ShaderEditor), [hook.nodes])

    useShortcuts(
        hook,
        () => window.blueprints.save(hook, hook.openFile.registryID).catch(),
        internalID
    )


    const submitNodeVariable = useCallback((event, attr, node) => {
        hook.setNodes(prev => {
            const n = [...prev]
            const classLocation = n.findIndex(e => e.id === node.id)
            const clone = cloneClass(prev[classLocation])
            clone[attr.key] = event
            const input = clone.inputs.find(i => i.key === attr.key)

            if (input.onChange)
                input.onChange(event)

            n[classLocation] = clone
            return n
        })
        hook.setChanged(true)
        hook.setImpactingChange(true)
    }, [hook.nodes])

    const updateNode = useCallback((key, value, node) => {
        hook.setNodes(prev => {
            const n = [...prev],
                classLocation = n.findIndex(e => e.id === node.id),
                clone = cloneClass(prev[classLocation])
            clone[key] = value
            n[classLocation] = clone
            return n
        })
    }, [hook.nodes])

    return (
        <UpdateNodeProvider.Provider
            value={{
                updateNode, submitNodeVariable
            }}
        >
            <div className={styles.wrapper} id={internalID}>
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
                            label: "Node",
                            content: (
                                <AttributeEditor
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
        </UpdateNodeProvider.Provider>
    )
}
Editor.propTypes = {
    hook: PropTypes.object,
}