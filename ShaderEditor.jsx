import styles from "./styles/MaterialView.module.css"
import React, {useContext, useEffect, useId, useState} from "react"
import PropTypes from "prop-types"
import useShaderEditor from "./hooks/useShaderEditor"
import compileShaders from "./libs/compiler/compileShaders"
import BlueprintProvider from "../../context/BlueprintProvider"
import Header from "../../../components/view/components/Header"
import {Button, Dropdown, DropdownOption, DropdownOptions, Icon} from "@f-ui/core"
import COMPONENTS from "../../engine/templates/COMPONENTS"
import Editor from "./components/Editor"

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
                        hideArrow={true}
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


