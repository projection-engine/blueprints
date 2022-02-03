import PropTypes from "prop-types";
import styles from '../styles/Node.module.css'
import {useEffect, useRef, useState} from "react";
import getBezierCurve from "../utils/bezierCurve";
import {ToolTip} from "@f-ui/core";
import checkType from "../utils/checkType";

export default function Node(props) {
    const ref = useRef()
    const pathRef = useRef()

    const [height, setHeight] = useState()
    useEffect(() => {
        setHeight(ref.current.firstChild.scrollHeight)
    }, [])

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
                x: (bBox.x + bounding.x + 7.5)/props.scale,
                y: (bBox.y + bounding.y + 7.5)/props.scale
            },
            {x1: (event.clientX + bounding.x + 7.5)/props.scale, y1: (event.clientY + bounding.y + 7.5)/props.scale})

        pathRef.current?.setAttribute('d', curve)
    }
    let lastPlacement = {
        x: 0,
        y: 0
    }
    const handleDragStart = (event) => {
        const t = event.currentTarget
        t.style.cursor = 'grabbing'
        ref.current.firstChild.style.outline = 'var(--fabric-accent-color) 2px solid'
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
        let nodeBbox = ref.current?.getBoundingClientRect()
        let current = {
            x: (nodeBbox.left + bounding.x)/props.scale,
            y: (nodeBbox.top + bounding.y)/props.scale
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
            nodeBbox = ref.current?.getBoundingClientRect()

            current = {
                x: ((nodeBbox.left + bounding.x) - toBeApplied.x)/props.scale,
                y: ((nodeBbox.top + bounding.y) - toBeApplied.y)/props.scale
            }

            ref.current?.setAttribute('transform', `translate(${current.x} ${current.y})`)
        }
        const handleMouseUp = () => {
            t.style.cursor = 'grab'
            const bBox = ref.current.getBoundingClientRect()
            let fixedPlacement = current
            if (bBox.top - parentBBox.top < 0)
                fixedPlacement.y = 0
            if (bBox.left - parentBBox.left < 0)
                fixedPlacement.x = 0

            if (bBox.top - parentBBox.top > parentBBox.height)
                fixedPlacement.y = parentBBox.height - bBox.height
            if (bBox.left - parentBBox.left > parentBBox.width)
                fixedPlacement.x = parentBBox.width - bBox.width

            ref.current?.setAttribute('transform', `translate(${fixedPlacement.x} ${fixedPlacement.y})`)

            document.removeEventListener('mousemove', handleMouseMove)
        }
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp, {once: true})
    }

    return (
        <g>
            <g
                ref={ref}
                transform={`translate(${props.node.x} ${props.node.y})`}
            >
                <foreignObject
                    data-node={props.node.id}
                    id={props.node.id}

                    className={styles.wrapper}
                    onClick={() => {
                        props.setSelected(props.node.id)
                    }}
                    style={{
                        width: '250px',
                        height: height + 'px',
                        outlineColor: props.selected === props.node.id ? 'var(--fabric-accent-color) !important' : undefined
                    }}>
                    <div className={styles.label}
                         onMouseDown={ev => handleDragStart(ev, props.node, props.handleChange)}>
                        <div className={'material-icons-round'}
                             style={{fontSize: '1.2rem'}}>drag_indicator
                        </div>
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
                                            e.currentTarget.style.background = 'var(--fabric-accent-color)'
                                        }}
                                        onDrop={e => {
                                            e.preventDefault()
                                            const data = JSON.parse(e.dataTransfer.getData('text'))
                                            e.currentTarget.style.background = 'var(--background-1)'
                                            const isValidType = checkType(data.instanceOf, a.accept)
                                            if (data.type === 'output' && isValidType)
                                                props.handleLink(data, {
                                                    attribute: a,
                                                    id: props.node.id
                                                })
                                            else if (data.type !== 'output')
                                                props.setAlert({
                                                    type: 'error',
                                                    message: 'Can\'t link input with input.'
                                                })
                                            else
                                                props.setAlert({
                                                    type: 'error',
                                                    message: 'Invalid type'
                                                })
                                        }}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        onDragLeave={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = 'var(--background-1)'
                                        }}
                                        onDrag={handleLinkDrag}
                                        onDragStart={e => e.dataTransfer.setData('text', JSON.stringify({
                                            id: props.node.id,
                                            type: 'input',
                                            attribute: a
                                        }))}/>
                                    <div className={styles.overflow} style={{fontWeight: 'normal'}}>
                                        {a.label}
                                    </div>
                                </div>
                            ))}
                            {props.node.showcase !== undefined ? props.node.showcase() : null}
                        </div>
                        <div className={styles.column} style={{justifyContent: 'flex-end'}}>
                            {props.node.output.map(a => (
                                <div className={styles.attribute} style={{justifyContent: 'flex-end'}} key={a.key}>
                                    <ToolTip
                                        content={JSON.stringify(props.node.constructor.name === 'Constant' ? props.node.value : props.node.response)}
                                        align={'middle'} justify={'start'}/>
                                    <div className={styles.overflow}>
                                        {a.label}
                                    </div>
                                    <div
                                        id={props.node.id + a.key}
                                        className={styles.connection}
                                        draggable={true}
                                        onDrop={() => {
                                            props.setAlert({
                                                type: 'error',
                                                message: 'Can\'t link with output.'
                                            })
                                        }}
                                        onDragLeave={e => {
                                            e.preventDefault()
                                            e.currentTarget.style.background = 'var(--background-1)'
                                        }}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        onDrag={handleLinkDrag}
                                        onDragStart={e => e.dataTransfer.setData('text', JSON.stringify({
                                            id: props.node.id,
                                            type: 'output',
                                            attribute: a,
                                            instanceOf: props.node.constructor.name
                                        }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </foreignObject>
            </g>
            <path
                ref={pathRef}
                fill={'none'}
                stroke={'var(--fabric-accent-color)'}
                strokeWidth={'2'}
                strokeDasharray={'3,3'}/>
        </g>
    )
}
Node.propTypes = {
    setAlert: PropTypes.func,
    node: PropTypes.object.isRequired,
    scale: PropTypes.number,
    handleLink: PropTypes.func,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
}