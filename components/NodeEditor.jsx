import {useMemo} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import PBRMaterial from "../workflows/material/templates/PBRMaterial";
import ResizableBar from "../../../components/resizable/ResizableBar";
import Response from "../templates/Response";
import Function from "../templates/Function";

import {RgbaColorPicker, RgbColorPicker} from "react-colorful";

import {TextField} from "@f-ui/core";
import Range from "../../../components/range/Range";
import Selector from "../../../components/selector/Selector";
import Viewport from "../../../components/viewport/Viewport";
import useVisualizer from "../../mesh/hook/useVisualizer";
import cloneClass from "../../editor/utils/misc/cloneClass";


export default function NodeEditor(props) {

    const selected = useMemo(() => {
        const index =  props.hook.nodes.findIndex(n => (props.selected ? n.id === props.selected : n instanceof PBRMaterial))
        if(index > -1)
            return props.hook.nodes[index]
        else
            return undefined
    }, [props.selected])


    const attributes = useMemo(() => {
        let res = []
        if (selected) {
            if (!(selected instanceof Response) && !(selected instanceof Function))
                res = [...selected.inputs, ...selected.output.filter(o => !o.notEditable)]
            else
                res = [...selected.inputs]


            res = [{
                key: 'name',
                value: selected.name,
                type: 'String',
                label: 'Node name'
            }].concat(res)

        }

        return res
    }, [selected])
    const parseToRGBA = (str) => {

        const m = typeof str === 'string' ? str?.match(/[\d.]+/g) : undefined
        if (m) {
            const [r, g, b, a] = m.map(v => parseFloat(v))
            return {r: r, g: g, b: b, a: a}
        } else
            return null
    }
    const parseToRGB = (str) => {
        const m = typeof str === 'string' ? str?.match(/[\d.]+/g) : undefined
        if (m) {
            const [r, g, b] = m.map(v => parseFloat(v))
            return {r: r, g: g, b: b}
        } else
            return null
    }
    const getInput = (notEditable, label, type, value, submit) => {
        switch (type) {
            case 'Constant':
                return (
                    <Range disabled={notEditable} value={value} handleChange={submit} label={label}/>
                )
            case 'RGBA':
                return (
                    <div className={styles.formFieldWrapper}>
                        <div className={styles.label}>
                            {label}
                        </div>
                        <RgbaColorPicker color={parseToRGBA(value)} onChange={e => {
                            submit(`rgba(${e.r},${e.g},${e.b},${e.a})`)
                        }}/>
                    </div>
                )

            case 'RGB':
                return (
                    <div className={styles.formFieldWrapper}>
                        <div className={styles.label}>
                            {label}
                        </div>
                        <RgbColorPicker color={parseToRGB(value)} onChange={e => submit(`rgb(${e.r},${e.g},${e.b})`)}/>
                    </div>

                )

            case 'Image':
                return <Selector
                    availableTextures={props.hook.quickAccess.images}
                    handleChange={ev => {

                        submit({
                            name: ev.name,
                            id: ev.id,
                            previewImage: ev.previewImage
                        })
                    }}
                    selected={props.hook.quickAccess.images.find(e => e.id === value?.id)}/>
            case 'String':
                return <TextField value={value} width={'100%'} size={'small'}
                                  handleChange={ev => submit(ev.target.value)} label={label} placeholder={label}/>

            default:
                return
        }

    }
    const engine = useVisualizer(true, true, true)


    return (
        <div className={styles.wrapper}>
            <div style={{width: '100%', height: '200px', overflow: 'hidden'}}><Viewport allowDrop={false} id={engine.id} engine={engine}/></div>
            <ResizableBar type={'height'}/>
            <div className={styles.form}>
                {selected ? attributes.map(attr => (
                    getInput(
                        attr.notEditable,
                        attr.label,
                        attr.type,
                        selected[attr.key],
                        (event) => props.hook.setNodes(prev => {
                            const n = [...prev]
                            const classLocation = n.findIndex(e => e.id === selected.id)
                            const clone = cloneClass(prev[classLocation])
                            clone[attr.key] = event

                            if (attr.type === 'RGBA') {
                                const parsed = parseToRGBA(event)
                                if (parsed) {
                                    clone.r = `rgba(${parsed.r},0,0, 1)`
                                    clone.g = `rgba(0,${parsed.g},0, 1)`
                                    clone.b = `rgba(0,0,${parsed.b}, 1)`
                                    clone.b = `rgba(0,0,0,${parsed.a})`
                                }
                            }
                            if (attr.type === 'RGB') {
                                const parsed = parseToRGB(event)
                                if (parsed) {
                                    clone.r = `rgb(${parsed.r},0,0)`
                                    clone.g = `rgb(0,${parsed.g},0)`
                                    clone.b = `rgb(0,0,${parsed.b})`
                                }
                            }

                            n[classLocation] = clone
                            return n
                        }))
                )) : null}
            </div>
            <ResizableBar type={'width'}/>
        </div>
    )
}

NodeEditor.propTypes = {
    workflow: PropTypes.oneOf(['material']),
    selected: PropTypes.string,
    hook: PropTypes.object
}