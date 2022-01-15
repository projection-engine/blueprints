import {useContext, useEffect, useLayoutEffect, useMemo, useState} from "react";
import styles from '../styles/NodeEditor.module.css'
import PropTypes from "prop-types";
import DatabaseProvider from "../../../hook/DatabaseProvider";
import PBRMaterial from "../workflows/material/templates/PBRMaterial";
import ResizableBar from "../../../components/resizable/ResizableBar";
import Response from "../templates/Response";
import Function from "../templates/Function";
import cloneClass from "../../../components/shared/utils/cloneClass";
import Range from "../../../components/range/Range";
import {RgbaColorPicker, RgbColorPicker} from "react-colorful";
import TextureForm from "../../../components/shared/TextureForm";
import {TextField} from "@f-ui/core";
import Viewport from "../../viewport/Viewport";
import randomID from "../../../components/shared/utils/randomID";
import useEngine from "../../../core/useEngine";

export default function NodeEditor(props) {
    const database = useContext(DatabaseProvider)
    const selected = useMemo(() => {
        return props.hook.nodes.findIndex(n => (props.selected ? n.id === props.selected : n instanceof PBRMaterial))
    }, [props.selected])
    const [availableTextures, setAvailableTextures] = useState([])
    const [id, setId] = useState()

    useLayoutEffect(() => {
        setId(randomID())
    }, [])

    const engine = useEngine(id, 'showcase')
    useEffect(() => {
        database.table('file')
            .where('type').anyOfIgnoreCase('png')
            .or('type').startsWithIgnoreCase('jpeg')
            .or('type').anyOfIgnoreCase('jpg')
            .toArray().then(res => {
            setAvailableTextures(res)
        })
    }, [])
    const attributes = useMemo(() => {
        let res = []
        const s = props.hook.nodes[selected]

        if (s) {

            if (!(s instanceof Response) && !(s instanceof Function))
                res = [...s.inputs, ...s.output.filter(o => !o.notEditable)]
            else
                res = [...s.inputs]


            res = [{
                key: 'name',
                value: s.name,
                type: 'String',
                label: 'Node name'
            }].concat(res)

        }

        return res
    }, [props.selected])
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
                return <TextureForm
                    availableTextures={availableTextures}
                    handleChange={ev => {
                        console.log(ev)
                        submit({
                            name: ev.name,
                            id: ev.id,
                            blob: ev.blob
                        })
                    }} classObject={value}/>
            case 'String':
                return <TextField value={value} width={'100%'} size={'small'}
                                  handleChange={ev => submit(ev.target.value)} label={label} placeholder={label}/>

            default:
                return
        }

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.viewportWrapper}>
                <Viewport
                    allowDrop={false}
                    id={id}
                    engine={engine}
                />
                <ResizableBar direction={"height"}/>
            </div>
            <div className={styles.form}>
                {attributes.map(attr => (
                    getInput(
                        attr.notEditable,
                        attr.label,
                        attr.type,
                        props.hook.nodes[selected][attr.key],
                        (event) => props.hook.setNodes(prev => {
                            const n = [...prev]
                            const clone = cloneClass(n[selected])
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

                            n[selected] = clone
                            return n
                        }))
                ))}
            </div>
            <ResizableBar maxDimension={500} minDimension={100} direction={"width"}/>
        </div>
    )
}

NodeEditor.propTypes = {
    workflow: PropTypes.oneOf(['material']),
    selected: PropTypes.string,
    hook: PropTypes.object
}