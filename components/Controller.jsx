import {useMemo, useRef, useState} from "react";
import styles from '../styles/Controller.module.css'
import PropTypes from "prop-types";

export default function Controller(props) {

    const selected = useMemo(() => {
        return props.hook.nodes.findIndex(n => n.id === props.selected)
    }, [props.selected])
    const selectedPosition = useMemo(() => {
        if (selected > -1)
            return document.getElementById(props.selected).getBoundingClientRect()
        else
            return undefined
    }, [selected])

    const ref = useRef()
    let lastPlacement = {
        x: 0,
        y: 0
    }

    const handleDragStart = (event) => {
        lastPlacement = {
            x: ref.current.offsetLeft - event.clientX,
            y: ref.current.offsetTop - event.clientY
        }

        const handleMouseMove = (ev) => {
            ref.current.style.top = (ev.clientY + lastPlacement.y) + 'px'
            ref.current.style.left = (ev.clientX + lastPlacement.x) + 'px'
        }
        const handleMouseUp = () => {
            document.body.removeEventListener('mousemove', handleMouseMove)
        }
        document.body.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseup', handleMouseUp, {once: true})
    }

    const [current, setCurrent] = useState({})

    if (selected > -1 && selectedPosition && props.hook.nodes[selected] && props.hook.nodes[selected].form !== undefined)
        return (
            <div
                ref={ref}
                className={styles.wrapper}
                style={{
                    top: (selectedPosition.y + selectedPosition.height / 2) + 'px',
                    left: (selectedPosition.x + selectedPosition.width / 2) + 'px'
                }}
            >
                <div className={styles.header} onMouseDown={handleDragStart}>
                    <span className={'material-icons-round'}>drag_indicator</span>
                    {props.hook.nodes[selected].name}
                </div>

                <div className={styles.form}>
                    {props.hook.nodes[selected].form((ev) => {
                        current[ev.key] = ev.value
                        props.hook.setNodes(prev => {
                            const copy = [...prev]
                            let clone = Object.assign(Object.create(Object.getPrototypeOf(copy[selected])), copy[selected])
                            clone[ev.key] = ev.value
                            copy[selected] = clone
                            return copy
                        })
                    })}
                </div>
            </div>
        )
    else
        return null
}

Controller.propTypes = {
    selected: PropTypes.string,
    hook: PropTypes.object
}