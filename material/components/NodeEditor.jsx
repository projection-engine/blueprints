import React, {useMemo} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import Material from "../nodes/Material";

import {Accordion, AccordionSummary, Dropdown, DropdownOption, DropdownOptions, TextField} from "@f-ui/core";
import Range from "../../../../components/range/Range";
import Selector from "../../../../components/selector/Selector";

import ColorPicker from "../../../../components/color/ColorPicker";

import cloneClass from "../../../../services/utils/misc/cloneClass";
import {TYPES} from "../../base/TYPES";

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


    const getInput = (label, type, value, submit, obj) => {
        switch (type) {
            case TYPES.NUMBER:
                return (
                    <Range
                        precision={3} maxValue={obj.max} incrementPercentage={.001} minValue={obj.min}
                        value={value !== undefined ? value : 0}
                        onFinish={(v) => {
                            submit(v)
                            props.hook.setChanged(true)
                            if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                props.hook.setImpactingChange(true)
                        }}
                        handleChange={submit} label={label}
                    />
                )
            case TYPES.VEC:
                return (
                    <div className={styles.vecWrapper}>
                        <Range
                            accentColor={'red'}
                            maxValue={obj.max}
                            minValue={obj.min}
                            value={value ? value[0] : undefined}
                            onFinish={(v) => {
                                submit([parseFloat(v), value[1], value[2]])
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            handleChange={v => submit([parseFloat(v), value[1], value[2]])} label={label}/>
                        <Range
                            accentColor={'green'}
                            maxValue={obj.max}
                            minValue={obj.min}
                            onFinish={(v) => {
                                submit([value[0], parseFloat(v), value[2]])
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            value={value ? value[1] : undefined}
                            handleChange={v => submit([value[0], parseFloat(v), value[2]])} label={label}/>
                        <Range
                            accentColor={'blue'}
                            maxValue={obj.max}
                            minValue={obj.min}
                            onFinish={(v) => {
                                submit([value[0], value[1], parseFloat(v)])
                                props.hook.setChanged(true)
                                if (props.hook.selected.length > 0 && !(selected instanceof Material))
                                    props.hook.setImpactingChange(true)
                            }}
                            value={value ? value[2] : undefined}
                            handleChange={v => submit([value[0], value[1], parseFloat(v)])} label={label}/>
                    </div>
                )
            case TYPES.COLOR:
                return <ColorPicker
                    submit={c => {
                        submit(c)
                        props.hook.setChanged(true)
                        props.hook.setImpactingChange(true)
                        console.log('E')
                    }}
                    value={value}/>
            case TYPES.TEXTURE:
                return (
                    <Selector
                        type={'image'}
                        handleChange={ev => {
                            submit(ev)
                            props.hook.setChanged(true)
                            props.hook.setImpactingChange(true)
                        }}
                        selected={value}/>
                )

            case TYPES.OPTIONS:
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
                                            submit(o.data)
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
                        <Accordion contentClassName={styles.content} >
                            <AccordionSummary className={styles.summary}>
                                {attr.label}
                            </AccordionSummary>

                            {getInput(
                                attr.label,
                                attr.type,
                                selected[attr.key],
                                (event) => {
                                    if (props.hook.selected.length > 0)
                                        props.hook.setNodes(prev => {
                                            const n = [...prev]
                                            const classLocation = n.findIndex(e => e.id === selected.id)
                                            const clone = cloneClass(prev[classLocation])
                                            clone[attr.key] = event
                                            n[classLocation] = clone
                                            return n
                                        })
                                    else {
                                        if (attr.key === 'tilingX')
                                            props.engine.material.uvScale = [event, selected[attr.key].tilingY ? selected[attr.key].tilingY : 1]
                                        if (attr.key === 'tilingY')
                                            props.engine.material.uvScale = [selected[attr.key].tilingX ? selected[attr.key].tilingX : 1, event]

                                        selected[attr.key] = event
                                    }
                                },
                                attr)

                            }

                        </Accordion>

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