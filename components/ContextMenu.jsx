import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import styles from '../styles/Context.module.css'
import {Button} from "@f-ui/core";

export default function ContextMenu(props) {
    const ref = useRef()
    const contextRef = useRef()
    const [selected, setSelected] = useState()

    const handleContext = (event) => {
        let target = document.elementsFromPoint(event.clientX, event.clientY)
        target = target.filter(t => t.getAttribute('data-context') === 'available')

        if (target.length === 1) {
            target = target[0]

            event.preventDefault()
            setSelected(target.getAttribute('data-identification'))
            contextRef.current.style.zIndex = '10'
            contextRef.current.style.left = event.clientX + 'px'
            contextRef.current.style.top = (event.clientY - contextRef.current.offsetHeight < 0) ? (event.clientY + contextRef.current.offsetHeight) : event.clientY + 'px'
        }
    }

    const handleMouseDown = (event) => {
        if (!document.elementsFromPoint(event.clientX, event.clientY).includes(contextRef.current))
            contextRef.current.style.zIndex = '-1'
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        ref.current?.addEventListener('contextmenu', handleContext)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            ref.current?.removeEventListener('contextmenu', handleContext)
        }
    }, [])

    return (
        <>
            <div className={styles.wrapper} ref={contextRef}>
                <Button
                    className={styles.button}
                    color={'secondary'}
                    onClick={() => {
                        props.handleChange({
                            type: 'delete',
                            target: selected
                        })

                        contextRef.current.style.zIndex = '-1'
                        setSelected(undefined)
                    }}>
                    <span className={'material-icons-round'}>delete</span>
                    Delete
                </Button>
            </div>
            <div className={props.className}
                 style={props.styles}
                 ref={ref}
               >
                {props.children}
            </div>
        </>
    )
}

ContextMenu.propTypes = {
    handleChange: PropTypes.func,
    children: PropTypes.node,
    styles: PropTypes.object,
    className: PropTypes.string
}
