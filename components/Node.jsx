import PropTypes from "prop-types";
import styles from '../styles/Node.module.css'
import {useEffect, useMemo, useRef} from "react";
import getBezierCurve from "../utils/bezierCurve";
import {ToolTip} from "@f-ui/core";

export default function Node(props) {
    const ref = useRef()
    const pathRef = useRef()

    const height = useMemo(() => {
        return (props.node.inputs.length > props.node.outputs.length ? props.node.inputs.length + 1 : props.node.outputs.length + 1) * 25 + 35
    }, [])
    let lastPlacement = {
        x: 0,
        y: 0
    }

    const handleLinkDrag = (event) => {
        const parent = ref.current?.parentNode.parentNode
        const bBox = event.currentTarget.getBoundingClientRect()
        let parentBBox = parent.getBoundingClientRect()
        const bounding = {
            x: parent.scrollLeft - parentBBox.left,
            y: parent.scrollTop - parentBBox.top
        }

        const curve = getBezierCurve(
            {
                x: bBox.x + bounding.x + 7.5,
                y: bBox.y + bounding.y + 7.5
            },
            {x1: event.clientX + bounding.x + 7.5, y1: event.clientY + bounding.y + 7.5})

        pathRef.current?.setAttribute('d', curve)
    }
    const handleDragStart = (event) => {
        const t = event.currentTarget
        t.style.cursor = 'grabbing'
        ref.current.firstChild.style.outline = '#0095ff 2px solid'
        const parent = ref.current?.parentNode.parentNode
        let parentBBox = parent.getBoundingClientRect()
        let bounding = {
            x: parent.scrollLeft - parentBBox.left,
            y: parent.scrollTop - parentBBox.top
        }
        lastPlacement = {
            x: event.clientX + bounding.x,
            y: event.clientY + bounding.y
        }

        const handleMouseMove = (ev) => {
            parentBBox = parent.getBoundingClientRect()
            bounding = {
                x: parent.scrollLeft - parentBBox.left,
                y: parent.scrollTop - parentBBox.top
            }
            const mousePlacement = {
                x: ev.clientX + bounding.x,
                y: ev.clientY + bounding.y
            }
            const toBeApplied = {
                x: lastPlacement.x - mousePlacement.x,
                y: lastPlacement.y - mousePlacement.y
            }

            lastPlacement = mousePlacement
            const nodeBbox = ref.current?.getBoundingClientRect()
            const current = {
                x: (nodeBbox.left + bounding.x) - toBeApplied.x / props.scale,
                y: (nodeBbox.top + bounding.y) - toBeApplied.y / props.scale
            }

            ref.current?.setAttribute('transform', `translate(${current.x} ${current.y})`)
        }
        const handleMouseUp = () => {
            ref.current.firstChild.style.outline = 'transparent 2px solid'
            t.style.cursor = 'grab'

            document.body.removeEventListener('mousemove', handleMouseMove)
        }
        document.body.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseup', handleMouseUp, {once: true})
    }

    return (
        <g>
            <g
                ref={ref}
                transform={`translate(${props.node.x} ${props.node.y})`}
            >
                <foreignObject
                    id={props.node.id}
                    className={styles.wrapper}
                    style={{width: '200px', height: height + 'px'}}>
                    <div className={styles.label}
                         onMouseDown={ev => handleDragStart(ev, props.node, props.handleChange)}>
                        {props.node.name}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.column}>
                            {props.node.inputs.map(a => (
                                <div className={styles.attribute} key={a.key}>
                                    <ToolTip content={'Input: ' + a.label} align={'middle'} justify={'end'}/>
                                    <div
                                        id={props.node.id + a.key}
                                        className={styles.connection}
                                        draggable={true}
                                        onDragOver={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = '#0095ff'
                                        }}
                                        onDrop={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = 'var(--fabric-background-primary)'
                                            props.handleLink(JSON.parse(e.dataTransfer.getData('text')), {
                                                attribute: a,
                                                id: props.node.id
                                            })
                                        }}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        onDragLeave={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = 'var(--fabric-background-primary)'
                                        }}
                                        onDrag={handleLinkDrag}
                                        onDragStart={e => e.dataTransfer.setData('text', JSON.stringify({
                                            id: props.node.id,
                                            type: 'input',
                                            attribute: a
                                        }))}/>
                                    <div className={styles.overflow}>
                                        {a.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.column} style={{justifyContent: 'flex-end'}}>
                            {props.node.outputs.map(a => (
                                <div className={styles.attribute} key={a.key}>
                                    <ToolTip content={'Output: ' + a.label} align={'middle'} justify={'start'}/>
                                    <div className={styles.overflow}>
                                        {a.label}
                                    </div>
                                    <div
                                        id={props.node.id + a.key}
                                        className={styles.connection}
                                        draggable={true}
                                        onDragLeave={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = 'var(--fabric-background-primary)'
                                        }}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        onDrag={handleLinkDrag}
                                        onDragStart={e => e.dataTransfer.setData('text', JSON.stringify({
                                            id: props.node.id,
                                            type: 'output',
                                            attribute: a
                                        }))}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </foreignObject>
            </g>
            <path
                ref={pathRef}
                fill={'none'}
                stroke={'#0095ff'}
                strokeWidth={'2'}
                strokeDasharray={'3,3'}/>
        </g>
    )
}
Node.propTypes = {
    node: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    scale: PropTypes.number,
    handleLink: PropTypes.func
}