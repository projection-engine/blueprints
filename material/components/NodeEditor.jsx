import React, {useMemo} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import Material from "../nodes/Material";

import {Dropdown, DropdownOption, DropdownOptions, TextField} from "@f-ui/core";
import Range from "../../../../../components/range/Range";
import Selector from "../../../../../components/selector/Selector";

import ColorPicker from "../../../../../components/color/ColorPicker";

import cloneClass from "../../../../engine/utils/cloneClass";
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import AccordionTemplate from "../../../../../components/templates/AccordionTemplate";

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

    const getInput = (label, type, value, submit, obj) => {
        switch (type) {
            case DATA_TYPES.INT:
            case DATA_TYPES.FLOAT:
                return (
                    <Range
                        precision={type === DATA_TYPES.FLOAT ? 3 : 0}

                        maxValue={obj.max} incrementPercentage={type === DATA_TYPES.FLOAT ? .001 : 1} minValue={obj.min}
                        value={value !== undefined ? value : 0}
                        onFinish={(v) => {
                            submit(type === DATA_TYPES.FLOAT ? v : parseInt(v), true)
                            props.hook.setChanged(true)
                            if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                props.hook.setImpactingChange(true)
                        }}
                        handleChange={submit} label={label}
                    />
                )
            case DATA_TYPES.VEC4:
            case DATA_TYPES.VEC3:
            case DATA_TYPES.VEC2:
                return (
                    <div className={styles.vecWrapper}>
                        <Range
                            accentColor={'red'}
                            maxValue={obj.max}
                            minValue={obj.min}
                            value={value ? value[0] : undefined}
                            onFinish={(v) => {
                                submit(getNewVec(value, v, 0, type), true)
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            handleChange={v => submit(getNewVec(value, v, 0, type))} label={label}/>
                        <Range
                            accentColor={'green'}
                            maxValue={obj.max}
                            minValue={obj.min}
                            onFinish={(v) => {
                                submit(getNewVec(value, v, 1, type), true)
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            value={value ? value[1] : undefined}
                            handleChange={v => submit(getNewVec(value, v, 1, type))} label={label}/>
                        {type === DATA_TYPES.VEC4 || type === DATA_TYPES.VEC3 ? (
                            <Range
                                accentColor={'blue'}
                                maxValue={obj.max}
                                minValue={obj.min}
                                onFinish={(v) => {
                                    submit(getNewVec(value, v, 2, type), true)
                                    props.hook.setChanged(true)
                                    if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                        props.hook.setImpactingChange(true)
                                }}
                                value={value ? value[2] : undefined}
                                handleChange={v => submit(getNewVec(value, v, 2, type))} label={label}/>
                        ) : null}
                        {type === DATA_TYPES.VEC4 ? (
                            <Range
                                accentColor={'blue'}
                                maxValue={obj.max}
                                minValue={obj.min}
                                onFinish={(v) => {
                                    submit([value[0], value[1], value[2], parseFloat(v)], true)
                                    props.hook.setChanged(true)
                                    if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                        props.hook.setImpactingChange(true)
                                }}
                                value={value ? value[3] : undefined}
                                handleChange={v => submit(getNewVec(value, v, 3, type))} label={label}/>
                        ) : null}
                    </div>
                )
            case DATA_TYPES.COLOR:
                return <ColorPicker
                    submit={c => {
                        submit(c, true)
                        props.hook.setChanged(true)
                        props.hook.setImpactingChange(true)
                    }}
                    value={value}/>
            case DATA_TYPES.TEXTURE:
                return (
                    <Selector
                        type={'image'}
                        handleChange={ev => {
                            submit(ev, true)
                            props.hook.setChanged(true)
                            props.hook.setImpactingChange(true)
                        }}
                        selected={value}/>
                )

            case DATA_TYPES.OPTIONS:
                return (
                    <Dropdown styles={{width: '100%', justifyContent: 'space-between'}}>
                        {obj.options.find(o => o.data === selected[obj.key])?.label}
                        <DropdownOptions>
                            {obj.options?.map((o, i) => (
                                <React.Fragment key={'options-' + i}>
                                    <DropdownOption option={{
                                        ...o,
                                        icon: o.data === selected[obj.key] ? <span style={{fontSize: '1.1rem'}}
                                                                                   className={'material-icons-round'}>check</span> : null,
                                        onClick: () => {
                                            props.hook.setChanged(true)
                                            props.hook.setImpactingChange(true)

                                            submit(o.data, true)
                                        }
                                    }}/>
                                </React.Fragment>
                            ))}
                        </DropdownOptions>
                    </Dropdown>
                )
            default:
                return
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                {selected ?
                    <TextField
                        value={selected.name} width={'100%'} size={'small'}
                        handleChange={ev => {
                            props.hook.setNodes(prev => {
                                const n = [...prev],
                                    classLocation = n.findIndex(e => e.id === selected.id),
                                    clone = cloneClass(prev[classLocation])

                                clone.name = ev.target.value
                                n[classLocation] = clone
                                return n
                            })
                        }}
                        label={'Name'}
                        placeholder={'Name'}/>
                    : null}
                {attributes.map((attr, i) => (
                    <React.Fragment key={attr.label + '-attribute-' + i}>
                        <AccordionTemplate title={attr.label}>
                            {getInput(
                                attr.label,
                                attr.type,
                                selected[attr.key],
                                (event, submit) => {

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

                                        if (attr.key === 'tilingX')
                                            props.engine.material.uvScale = [event, selected[attr.key].tilingY ? selected[attr.key].tilingY : 1]
                                        if (attr.key === 'tilingY')
                                            props.engine.material.uvScale = [selected[attr.key].tilingX ? selected[attr.key].tilingX : 1, event]


                                        const input = selected.inputs.find(i => i.key === attr.key)

                                        selected[attr.key] = event
                                    }
                                },
                                attr)

                            }

                        </AccordionTemplate>
                    </React.Fragment>
                ))}
            </div>
            {/*<ResizableBar type={'width'}/>*/}
        </div>
    )
}

NodeEditor.propTypes = {
    engine: PropTypes.object.isRequired,

    selected: PropTypes.string,
    hook: PropTypes.object
}