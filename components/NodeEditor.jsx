import React, {useMemo, useRef} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import Material from "../workflows/material/Material";
import ResizableBar from "../../../components/resizable/ResizableBar";

import {Accordion, AccordionSummary, Button, TextField, ToolTip} from "@f-ui/core";
import Range from "../../../components/range/Range";
import Selector from "../../../components/selector/Selector";
import Viewport from "../../../components/viewport/Viewport";

import ColorPicker from "../../../components/color/ColorPicker";

import cloneClass from "../../../services/utils/misc/cloneClass";
import {TYPES} from "../templates/TYPES";

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
            res = [{
                key: 'name',
                value: selected.name,
                type: TYPES.STRING,
                label: 'Node name'
            }, ...selected.inputs.filter(o => !o.accept).map(e => {
                return {
                    ...e,
                    value: e[e.key]
                }
            })]
        }
        return res
    }, [selected])


    const getInput = (label, type, value, submit) => {
        switch (type) {
            case TYPES.NUMBER:
                return (
                    <Range value={value} handleChange={submit} label={label}/>
                )
            case TYPES.COLOR:
                return <ColorPicker submit={submit} value={value} label={'Color'}/>
            case TYPES.TEXTURE:
                return <Selector
                    type={'image'}
                    handleChange={ev => {
                        submit(ev)
                    }}
                    selected={value}/>
            case TYPES.STRING:
                return <TextField
                    value={value} width={'100%'} size={'small'}
                    handleChange={ev => submit(ev.target.value)}
                    label={label}
                    placeholder={label}/>

            default:
                return
        }
    }




    const viewportRef = useRef()
    return (
        <div className={styles.wrapper}>
            <div ref={viewportRef}
                 style={{width: '100%', height: '200px', overflow: 'hidden', position: 'relative'}}>
                <Viewport allowDrop={false} id={props.engine.id} engine={props.engine} renderer={props.engine.renderer}/>
                <Button
                    className={styles.refresh}
                    styles={{bottom: 'unset', top: '4px', right: 'unset', left: '4px'}}
                    onClick={() => {
                        viewportRef.current.requestFullscreen()
                    }}
                >
                    <ToolTip content={'Fullscreen'}/>
                    <span
                        className={'material-icons-round'}
                        style={{fontSize: '1.1rem'}}
                    >fullscreen</span>
                </Button>

            </div>
            <ResizableBar type={'height'}/>
            <div className={styles.form}>
                {attributes.map((attr, i) => (
                    <React.Fragment key={attr.label + '-attribute-' + i}>
                        <Accordion>
                            <AccordionSummary>
                                {attr.label}
                            </AccordionSummary>
                            <div className={styles.content}>
                                {getInput(
                                    attr.label,
                                    attr.type,
                                    selected[attr.key],
                                    (event) => props.hook.setNodes(prev => {
                                        const n = [...prev]
                                        const classLocation = n.findIndex(e => e.id === selected.id)
                                        const clone = cloneClass(prev[classLocation])
                                        clone[attr.key] = event

                                        n[classLocation] = clone
                                        return n
                                    }))}
                            </div>
                        </Accordion>

                    </React.Fragment>
                ))}
            </div>
            <ResizableBar type={'width'}/>
        </div>
    )
}

NodeEditor.propTypes = {
    engine: PropTypes.object.isRequired,
    workflow: PropTypes.oneOf(['material']),
    selected: PropTypes.string,
    hook: PropTypes.object
}