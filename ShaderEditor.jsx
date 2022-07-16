import styles from "./styles/ShaderEditor.module.css"
import React from "react"
import PropTypes from "prop-types"
import useShaderEditor from "./hooks/useShaderEditor"
import compileShaders from "./libs/compileShaders"
import Header from "../../../components/view/components/Header"
import {Button, Dropdown, DropdownOption, DropdownOptions, Icon, ToolTip} from "@f-ui/core"
import Editor from "./components/Editor"
import Available from "./components/Available"
import selection from "./utils/selection"
import SELECTION_TYPES from "./templates/SELECTION_TYPES"

const GRID_SIZE = 20
export default function ShaderEditor(props) {
    const hook = useShaderEditor()

    return (
        <>
            <Header
                {...props}
                title={"Shader Editor"}
                icon={"texture"}
                orientation={"horizontal"}
            >
                <div className={styles.options}>
                    <div className={styles.divider}/>
                    <Button
                        disabled={!hook.openFile?.registryID || !hook.changed} className={styles.button}
                        onClick={() => window.blueprints.save(hook).catch()}>
                        <Icon styles={{fontSize: "1rem"}}>save</Icon>
						Save
                    </Button>
                    <Button
                        disabled={!hook.openFile?.registryID}
                        className={styles.button}
                        onClick={() => compileShaders(hook).catch()}
                    >
                        <Icon styles={{fontSize: "1rem"}}>code</Icon>
						Compile
                    </Button>
                    <div className={styles.divider}/>
                    <Dropdown
                        className={styles.button}
                        styles={{paddingRight: "2px"}}
                        disabled={hook.quickAccessMaterials.length === 0}
                    >
                        <div className={styles.icon}/>
                        {hook.openFile?.name ? hook.openFile.name : ""}
                        <DropdownOptions>
                            {hook.quickAccessMaterials.map((m, i) => (
                                <React.Fragment key={hook.internalID + "-material-" + i}>
                                    <DropdownOption option={{
                                        label: m.name,
                                        onClick: () => hook.setOpenFile(m)
                                    }}/>
                                </React.Fragment>
                            ))}
                        </DropdownOptions>
                    </Dropdown>
                    <Available disabled={!hook.openFile.registryID}/>
                </div>
                <div className={styles.options} style={{justifyContent: "flex-end"}}>
                    <Dropdown
                        className={styles.button}
                        styles={{paddingRight: "2px"}}
                    >
                        Select
                        <DropdownOptions>
                            <DropdownOption
                                option={{
                                    label: "All",
                                    onClick: () => selection(SELECTION_TYPES.ALL, hook),
                                    shortcut: "A"
                                }}
                            />
                            <DropdownOption
                                option={{
                                    label: "None",
                                    onClick: () => selection(SELECTION_TYPES.NONE, hook),
                                    shortcut: "Alt + A"
                                }}
                            />
                            <DropdownOption
                                option={{
                                    label: "Invert",
                                    onClick: () => selection(SELECTION_TYPES.INVERT, hook),
                                    shortcut: "Ctrl + i"
                                }}
                            />
                        </DropdownOptions>
                    </Dropdown>
                    <Button
                        className={styles.button}
                        styles={{padding: "4px"}}
                        onClick={e => {
                            if (window.blueprints.grid === GRID_SIZE) {
                                window.blueprints.grid = 1
                                e.currentTarget.classList.remove(styles.highlightButton)
                            } else {
                                window.blueprints.grid = GRID_SIZE
                                e.currentTarget.classList.add(styles.highlightButton)
                            }
                        }}
                    >
                        <Icon styles={{fontSize: "1rem"}}>grid_4x4</Icon>
                        <ToolTip content={"Toggle movement grid"}/>
                    </Button>
                </div>
            </Header>
            {props.hidden ? null : <Editor hook={hook}/>}
        </>
    )
}

ShaderEditor.propTypes = {
    hidden: PropTypes.bool,
    switchView: PropTypes.func,
    orientation: PropTypes.string,
}


