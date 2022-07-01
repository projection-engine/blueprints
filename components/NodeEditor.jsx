import React, {useMemo} from "react"
import styles from "../styles/NodeEditor.module.css"
import PropTypes from "prop-types"
import Material from "../nodes/Material"

import {Checkbox, Dropdown, DropdownOption, DropdownOptions, Icon, TextField} from "@f-ui/core"
import Range from "../../../../components/range/Range"
import Selector from "../../../../components/selector/Selector"

import ColorPicker from "../../../../components/color/ColorPicker"

import cloneClass from "../../../engine/utils/cloneClass"
import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import AccordionTemplate from "../../../../components/templates/AccordionTemplate"
import Float from "../nodes/math/Float"

export default function NodeEditor(props) {
    const selected = useMemo(() => {
        const index = props.hook.nodes.findIndex(n => (props.selected ? n.id === props.selected : n instanceof Material))
        if (index > -1)
            return props.hook.nodes[index]
        else
            return undefined
    }, [props.selected, props.hook.nodes])
    const attributes = useMemo(() => {
        let res = []
        if (selected) {
            res = selected.inputs.filter(o => !o.accept).map(e => {
                return {
                    ...e,
                    value: e[e.key]
                }
            })
        }
        return res
    }, [selected])
    const getNewVec = (value, v, index, type) => {
        switch (type) {
        case  DATA_TYPES.VEC2:
            return [index === 0 ? v : value[0], index === 1 ? v : value[1]]
        case  DATA_TYPES.VEC3:
            return [
                index === 0 ? v : value[0],
                index === 1 ? v : value[1],
                index === 2 ? v : value[2]
            ]
        case  DATA_TYPES.VEC4:
            return [
                index === 0 ? v : value[0],
                index === 1 ? v : value[1],
                index === 2 ? v : value[2],
                index === 3 ? v : value[3]
            ]
        default:
            return value
        }
    }
    function submitNodeVariable(event, submit, attr) {
        if (props.hook.selected.length > 0 || submit) {
            if (submit)
                props.hook.setNodes(prev => {
                    const n = [...prev]
                    const classLocation = n.findIndex(e => e.id === selected.id)
                    const clone = cloneClass(prev[classLocation])
                    clone[attr.key] = event
                    const input = clone.inputs.find(i => i.key === attr.key)

                    if (input.onChange)
                        input.onChange(event)

                    n[classLocation] = clone
                    return n
                })
            else
                selected[attr.key] = event
        } else {
            if (attr.key === "tilingX")
                props.material.uvScale = [event, selected[attr.key].tilingY ? selected[attr.key].tilingY : 1]
            if (attr.key === "tilingY")
                props.material.uvScale = [selected[attr.key].tilingX ? selected[attr.key].tilingX : 1, event]
            selected[attr.key] = event
        }
    }
    const getInput = (label, type, value, obj) => {
        switch (type) {
        case DATA_TYPES.INT:
        case DATA_TYPES.FLOAT:
            return (
                <Range
                    precision={type === DATA_TYPES.FLOAT ? 3 : 0}

                    maxValue={obj.max} incrementPercentage={type === DATA_TYPES.FLOAT ? .001 : 1} minValue={obj.min}
                    value={value !== undefined ? value : 0}
                    onFinish={(v) => {
                        submitNodeVariable(type === DATA_TYPES.FLOAT ? v : parseInt(v), true, obj)
                        props.hook.setChanged(true)
                        if (props.hook.selected.length > 0 && !(selected instanceof Material))
                            props.hook.setImpactingChange(true)
                    }}
                    handleChange={(v) => submitNodeVariable(v,false, obj)} label={label}
                />
            )
        case DATA_TYPES.VEC4:
        case DATA_TYPES.VEC3:
        case DATA_TYPES.VEC2:
            return (
                <div className={styles.vecWrapper}>
                    <Range
                        accentColor={"red"}
                        maxValue={obj.max}
                        minValue={obj.min}
                        value={value ? value[0] : undefined}
                        onFinish={(v) => {
                            submitNodeVariable(getNewVec(value, v, 0, type), true, obj)
                            props.hook.setChanged(true)
                            if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                props.hook.setImpactingChange(true)
                        }}
                        handleChange={v => submitNodeVariable(getNewVec(value, v, 0, type), false, obj)} label={label}/>
                    <Range
                        accentColor={"green"}
                        maxValue={obj.max}
                        minValue={obj.min}
                        onFinish={(v) => {
                            submitNodeVariable(getNewVec(value, v, 1, type), true, obj)
                            props.hook.setChanged(true)
                            if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                props.hook.setImpactingChange(true)
                        }}
                        value={value ? value[1] : undefined}
                        handleChange={v => submitNodeVariable(getNewVec(value, v, 1, type), false, obj)} label={label}/>
                    {type === DATA_TYPES.VEC4 || type === DATA_TYPES.VEC3 ? (
                        <Range
                            accentColor={"blue"}
                            maxValue={obj.max}
                            minValue={obj.min}
                            onFinish={(v) => {
                                submitNodeVariable(getNewVec(value, v, 2, type), true, obj)
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            value={value ? value[2] : undefined}
                            handleChange={v => submitNodeVariable(getNewVec(value, v, 2, type),false, obj)} label={label}/>
                    ) : null}
                    {type === DATA_TYPES.VEC4 ? (
                        <Range
                            accentColor={"blue"}
                            maxValue={obj.max}
                            minValue={obj.min}
                            onFinish={(v) => {
                                submitNodeVariable([value[0], value[1], value[2], parseFloat(v)], true, obj)
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            value={value ? value[3] : undefined}
                            handleChange={v => submitNodeVariable(getNewVec(value, v, 3, type), false, obj)} label={label}/>
                    ) : null}
                </div>
            )
        case DATA_TYPES.COLOR:
            return <ColorPicker
                submit={c => {
                    submitNodeVariable(c, true, obj)
                    props.hook.setChanged(true)
                    props.hook.setImpactingChange(true)
                }}
                value={value}/>
        case DATA_TYPES.TEXTURE:
            return (
                <Selector
                    type={"image"}
                    handleChange={(src) => {
                        props.hook.setChanged(true)
                        props.hook.setImpactingChange(true)

                        submitNodeVariable(src, true, obj)
                    }}
                    selected={value}/>
            )

        case DATA_TYPES.OPTIONS:
            return (
                <Dropdown styles={{width: "100%", justifyContent: "space-between"}}>
                    {obj.options.find(o => o.data === selected[obj.key])?.label}
                    <DropdownOptions>
                        {obj.options?.map((o, i) => (
                            <React.Fragment key={"header-" + i}>
                                <DropdownOption option={{
                                    ...o,
                                    icon: o.data === selected[obj.key] ? <Icon styles={{fontSize: "1.1rem"}}
                                    >check</Icon> : null,
                                    onClick: () => {
                                        props.hook.setChanged(true)
                                        props.hook.setImpactingChange(true)

                                        submitNodeVariable(o.data, true, obj)
                                    }
                                }}/>
                            </React.Fragment>
                        ))}
                    </DropdownOptions>
                </Dropdown>
            )
        case DATA_TYPES.CHECKBOX:
            return (
                <Checkbox
                    label={obj.label}
                    disabled={obj.disabled}
                    width={"100%"}
                    checked={selected[obj.key]}
                    handleCheck={() => {
                        props.hook.setChanged(true)
                        props.hook.setImpactingChange(true)
                        submitNodeVariable(!selected[obj.key], true, obj)
                    }}
                    height={"25px"}
                    noMargin={true}
                />
            )
        default:
            return
        }
    }



    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                {selected instanceof Float ?
                    <TextField
                        value={selected.name} width={"100%"}
                        height={"35px"}
                        handleChange={ev => {
                            props.hook.setNodes(prev => {
                                const n = [...prev],
                                    classLocation = n.findIndex(e => e.id === selected.id),
                                    clone = cloneClass(prev[classLocation])

                                clone.name = ev
                                n[classLocation] = clone
                                return n
                            })
                        }}
                        label={"Name"}
                        placeholder={"Name"}/>
                    : null}
                {attributes.map((attr, i) => (
                    <React.Fragment key={attr.label + "-attribute-" + i}>
                        {attr.type === DATA_TYPES.CHECKBOX ?
                            getInput(
                                attr.label,
                                attr.type,
                                selected[attr.key],
                                attr
                            )
                            :
                            <AccordionTemplate title={attr.label}>
                                {getInput(
                                    attr.label,
                                    attr.type,
                                    selected[attr.key],
                                    attr
                                )}
                            </AccordionTemplate>
                        }
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

NodeEditor.propTypes = {
    material: PropTypes.object,
    selected: PropTypes.string,
    hook: PropTypes.object
}