import React, {useMemo, useRef} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import Material from "../nodes/Material";
import ResizableBar from "../../../components/resizable/ResizableBar";

import {
    Accordion,
    AccordionSummary,
    Button,
    Dropdown,
    DropdownOption,
    DropdownOptions,
    TextField,
    ToolTip
} from "@f-ui/core";
import Range from "../../../components/range/Range";
import Selector from "../../../components/selector/Selector";
import Viewport from "../../../components/viewport/Viewport";

import ColorPicker from "../../../components/color/ColorPicker";

import cloneClass from "../../../services/utils/misc/cloneClass";
import {TYPES} from "../../../components/flow/TYPES";
import {ENTITY_ACTIONS} from "../../../services/utils/entityReducer";
import MeshComponent from "../../../services/engine/ecs/components/MeshComponent";
import {IDS} from "../../../services/hooks/useVisualizer";

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
                    <Range precision={3} maxValue={obj.max} incrementPercentage={.001} minValue={obj.min} value={value !== undefined ? value : 0}
                           handleChange={submit} label={label}/>
                )
            case TYPES.VEC:
                return (
                    <div className={styles.vecWrapper}>
                        <Range accentColor={'red'} maxValue={obj.max} minValue={obj.min}
                               value={value ? value[0] : undefined}
                               handleChange={v => submit([parseFloat(v), value[1], value[2]])} label={label}/>
                        <Range accentColor={'green'} maxValue={obj.max} minValue={obj.min}
                               value={value ? value[1] : undefined}
                               handleChange={v => submit([value[0], parseFloat(v), value[2]])} label={label}/>
                        <Range accentColor={'blue'} maxValue={obj.max} minValue={obj.min}
                               value={value ? value[2] : undefined}
                               handleChange={v => submit([value[0], value[1], parseFloat(v)])} label={label}/>
                    </div>
                )
            case TYPES.COLOR:
                return <ColorPicker submit={submit} value={value} label={'Color'}/>
            case TYPES.TEXTURE:
                return (
                    <Selector
                        type={'image'}
                        handleChange={ev => submit(ev)}
                        selected={value}/>
                )

            case TYPES.OPTIONS:
                return (
                    <Dropdown styles={{width: '100%', justifyContent: 'space-between'}}>
                        {obj.options.find(o => o.data === selected[obj.key])?.label}
                        <DropdownOptions>
                            {obj.options?.map((o, i) => (
                                <React.Fragment key={'options-'+ i}>
                                    <DropdownOption option={{
                                        ...o,
                                        icon: o.data === selected[obj.key] ? <span style={{fontSize: '1.1rem'}} className={'material-icons-round'}>check</span> : null,
                                        onClick: () =>{
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

    const currentMesh = useMemo(() => {
        return props.engine.entities.find(e => e.id === IDS.SPHERE)
    }, [props.engine.entities])
    const viewportRef = useRef()
    return (
        <div className={styles.wrapper}>
            <div ref={viewportRef}
                 style={{width: '100%', height: '200px', overflow: 'hidden', position: 'relative'}}>
                <Viewport allowDrop={false} id={props.engine.id} engine={props.engine}
                          renderer={props.engine.renderer}/>
                <Button
                    className={[styles.floating, styles.button].join(' ')}
                    styles={{top: '4px', left: '4px'}}
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
                <div className={[styles.buttonGroup, styles.floating].join(' ')} style={{bottom: '4px', padding: '0 4px'}}>
                    <Button
                        className={styles.button}

                        disabled={currentMesh === IDS.SPHERE}
                        onClick={() => {
                            props.engine.dispatchEntities({
                                type: ENTITY_ACTIONS.UPDATE_COMPONENT,
                                payload: {
                                    entityID: IDS.SPHERE,
                                    key: 'MeshComponent',
                                    data: new MeshComponent(undefined, IDS.SPHERE)
                                }
                            })
                        }}
                    >
                        Sphere
                    </Button>
                    <Button
                        className={styles.button}
                        disabled={currentMesh === IDS.CUBE}
                        onClick={() => {
                            props.engine.dispatchEntities({
                                type: ENTITY_ACTIONS.UPDATE_COMPONENT,
                                payload: {
                                    entityID: IDS.SPHERE,
                                    key: 'MeshComponent',
                                    data: new MeshComponent(undefined, IDS.CUBE)
                                }
                            })
                        }}
                    >
                        Cube
                    </Button>
                </div>

            </div>
            <ResizableBar type={'height'}/>
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

                                        if(clone instanceof Material && props.engine.material && (attr.key === 'tilingX'||attr.key === 'tilingY')) {
                                            if (attr.key === 'tilingX')
                                                props.engine.material.uvScale = [event, clone.tilingY ? clone.tilingY : 1]
                                            if (attr.key === 'tilingY')
                                                props.engine.material.uvScale = [clone.tilingX ? clone.tilingX : 1, event]
                                        }

                                        n[classLocation] = clone
                                        return n
                                    }),
                                    attr)}
                            </div>
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