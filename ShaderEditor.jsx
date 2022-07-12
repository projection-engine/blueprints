import styles from "./styles/MaterialView.module.css"
import React, {useContext, useEffect, useId, useMemo, useState} from "react"
import PropTypes from "prop-types"
import useShaderEditor from "./hooks/useShaderEditor"
import compileShaders from "./utils/compileShaders"
import BlueprintProvider from "../../providers/BlueprintProvider"
import Header from "../../../components/view/components/Header"
import {Button, Dropdown, DropdownOption, DropdownOptions, Icon} from "@f-ui/core"
import QuickAccessProvider from "../../providers/QuickAccessProvider"
import COMPONENTS from "../../engine/templates/COMPONENTS"
import Editor from "./Editor"
import save from "./utils/save"
import MaterialInstance from "../../engine/instances/MaterialInstance"
import * as shaderCode from "../../engine/shaders/mesh/FALLBACK.glsl"
import FALLBACK_MATERIAL from "../../../static/misc/FALLBACK_MATERIAL"


export default function ShaderEditor(props) {
    const [openFile, setOpenFile] = useState({})
    const hook = useShaderEditor(openFile)
    const {
        selectedEntity,
        materials,
        setMaterials,
        submitPackage,
        quickAccessMaterials
    } = useContext(BlueprintProvider)

    useEffect(() => {
        if (selectedEntity && selectedEntity.components[COMPONENTS.MESH] && !openFile.registryID) {
            const mID = selectedEntity.components[COMPONENTS.MESH].materialID
            const found = quickAccessMaterials.find(m => m.registryID === mID)

            alert.pushAlert("Editing " + found.name, "info")
            if (found)
                setOpenFile(found)
        }
    }, [selectedEntity])

    const [currentMaterial, setCurrentMaterial] = useState()
    useEffect(() => {
        const found = materials.find(m => m.id === openFile.registryID)
        if (found)
            setCurrentMaterial(found)
        else
            setCurrentMaterial(new MaterialInstance({
                vertex: shaderCode.fallbackVertex,
                fragment: shaderCode.fragment,
                settings: {isForward: false},
                cubeMapShaderCode: shaderCode.cubeMapShader,
                id: FALLBACK_MATERIAL
            }))
    }, [openFile])

    useEffect(() => {
        if (Object.values(openFile).length === 0 && quickAccessMaterials[0])
            setOpenFile(quickAccessMaterials[0])
    }, [])
    const internalID = useId()

    return (
        <>
            <Header {...props} title={"Shader EditorCamera"} icon={"texture"} orientation={"horizontal"}>
                <div className={styles.options}>
                    <Dropdown
                        className={styles.button}
                        disabled={quickAccessMaterials.length === 0}
                        variant={"outlined"}
                        styles={{marginRight: "16px"}}
                    >
                        <div className={styles.icon}/>
                        {openFile.name ? openFile.name : ""}
                        <DropdownOptions>
                            {quickAccessMaterials.map((m, i) => (
                                <React.Fragment key={internalID + "-material-" + i}>
                                    <DropdownOption option={{
                                        label: m.name,
                                        onClick: () => setOpenFile(m)
                                    }}/>
                                </React.Fragment>
                            ))}
                        </DropdownOptions>
                    </Dropdown>
                    <Button disabled={!openFile.registryID || !hook.changed} className={styles.button}
                        variant={"outlined"}
                        onClick={() => save(hook, submitPackage, openFile.registryID, currentMaterial).catch()}>
                        <Icon styles={{fontSize: "1rem"}}>save</Icon>
						Save
                    </Button>
                    <Button
                        disabled={!openFile.registryID}
                        className={styles.button} variant={"outlined"} onClick={() => {
                            compileShaders(
                                hook,
                                currentMaterial,
                                (newMat) => {
                                    setMaterials(prev => {
                                        return [...prev].map(m => {
                                            if (m.id === openFile.registryID)
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
            {props.hidden ?
                null
                :
                <Editor
                    currentMaterial={currentMaterial}
                    hook={hook}
                    submitPackage={submitPackage}
                    registryID={openFile.registryID}
                    materials={materials}
                    setMaterials={setMaterials}
                />
            }
        </>
    )
}

ShaderEditor.propTypes = {
    hidden: PropTypes.bool,
    switchView: PropTypes.func,
    orientation: PropTypes.string,
}


