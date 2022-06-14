import styles from "../styles/Node.module.css"
import PropTypes from "prop-types"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import React, {useContext, useMemo, useRef} from "react"
import OnDragProvider from "../hooks/DragProvider"

import EmbeddedInput from "./EmbeddedInput"
import {Icon} from "@f-ui/core"

export default function NodeIO(props) {
    const isExecution = useMemo(() => {
        return (props.data.accept && props.data.accept.includes(DATA_TYPES.EXECUTION)) || props.data.type === DATA_TYPES.EXECUTION
    }, [])

    const wrapperRef = useRef()
    const asInput = (e) => {
        e.preventDefault()
        const data = JSON.parse(e.dataTransfer.getData("text"))
        e.currentTarget.style.background = "var(--pj-background-primary)"

        if (data.type === "output" && (props.data.accept.includes(data.attribute.type) || props.data.accept.includes(DATA_TYPES.ANY)))
            props.handleLink(data, {
                attribute: props.data,
                id: props.nodeID
            }, isExecution)
        else if (data.type !== "output")
            alert.pushAlert(
                "Can't link input with input.",
                "error"
            )
        else
            alert.pushAlert(
                "Invalid type",
                "error"
            )
    }

    const onDragContext = useContext(OnDragProvider)
    const isLinked = useMemo(() => {
        if (props.type === "input")
            return props.inputLinks.find(o => o.targetKey === props.data.key) !== undefined
        else
            return props.outputLinks.find(o => o.sourceKey === props.data.key) !== undefined
    }, [props.inputLinks, props.outputLinks])
    const linkColor = useMemo(() => {

        if (isLinked) {
            if (props.type === "input")
                return props.inputLinks.find(o => o.targetKey === props.data.key)?.color
            else
                return props.outputLinks.find(o => o.sourceKey === props.data.key)?.color
        } else
            return undefined

    }, [props.inputLinks, props.outputLinks])

    return (
        <>
            <div className={styles.attribute} ref={wrapperRef}
                data-dtype={props.type}
                data-disabled={`${props.data.disabled || props.data.type === DATA_TYPES.UNDEFINED && (props.inputLinks.length === 0 && props.node.inputs.length > 0)}`}
                style={{justifyContent: props.type === "input" ? "flex-start" : "flex-end"}}>

                {props.type === "output" && (!isExecution || props.data.showTitle) ? (
                    <div className={styles.overflow}
                        style={{color: props.data.color, fontWeight: "bold"}}>
                        {props.data.label}
                    </div>
                ) : null}
                <div

                    id={props.nodeID + props.data.key}
                    className={isExecution ? styles.executionConnection : styles.connection}
                    draggable={!(props.data.type === DATA_TYPES.UNDEFINED && (props.inputLinks.length === 0 && props.node.inputs.length > 0))}
                    data-dtype={props.type}
                    data-disabled={`${props.data.type === DATA_TYPES.UNDEFINED && (props.inputLinks.length === 0 && props.node.inputs.length > 0)}`}
                    style={{
                        "--pj-accent-color": isExecution ? "#0095ff" : "#999999",
                        background: linkColor && !props.data.disabled ? linkColor : undefined,
                        display: props.data.bundled && !props.data.accept ? "none" : undefined,
                    }}
                    onDrop={e => {
                        onDragContext.setDragType(undefined)
                        if (!props.data.disabled) {
                            if (props.type === "input")
                                asInput(e)
                            else
                                alert.pushAlert( 
                                    "error",
                                    "Can't link with output."
                                )
                        }
                    }}
                    onDragEnd={props.onDragEnd}

                    onDrag={props.handleLinkDrag}
                    onDragStart={e => {
                        if (props.type !== "input") {
                            const nType = props.data.type === DATA_TYPES.UNDEFINED ? (props.inputLinks.length === 1 ? props.inputLinks[0]?.sourceType : getPredominant(props.inputLinks) ): undefined
                            const attribute = props.data.type === DATA_TYPES.UNDEFINED ? {
                                ...props.data,
                                type: nType
                            } : props.data
                            e.dataTransfer
                                .setData(
                                    "text",
                                    JSON.stringify({
                                        id: props.nodeID,
                                        type: props.type,
                                        attribute
                                    })
                                )


                            onDragContext.setDragType(attribute.type)
                        } else
                            e.preventDefault()
                    }}>
                    {isExecution ?
                        <Icon >navigate_next</Icon> : null}
                </div>

                {props.type === "input" && (!isExecution || props.data.showTitle) ? (
                    <div data-disabled={`${props.data.disabled}`} className={styles.wrapperInput}
                        style={{fontWeight: "normal"}}>

                        {props.data.bundled && !isLinked ? null : (
                            <div className={styles.overflow}
                                style={{color: props.data.color}}>
                                {props.data.label}
                            </div>
                        )}
                        <EmbeddedInput
                            canRender={props.data.bundled && !isLinked}
                            type={props.type} node={props.node}
                            data={props.data} submit={props.submitBundledVariable}/>
                    </div>
                ) : null}
            </div>
        </>
    )
}


NodeIO.propTypes = {
    submitBundledVariable: PropTypes.func,
    node: PropTypes.object.isRequired,
    handleLink: PropTypes.func,
    nodeID: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["input", "output"]),
    handleLinkDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    data: PropTypes.shape({
        disabled: PropTypes.bool,
        key: PropTypes.string.isRequired,
        label: PropTypes.string,
        type: PropTypes.any,
        accept: PropTypes.array,
        color: PropTypes.string,
        showTitle: PropTypes.bool,
        bundled: PropTypes.bool,
        options: PropTypes.array
    }).isRequired,
    inputLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    outputLinks: PropTypes.arrayOf(PropTypes.object).isRequired
}

function getPredominant([a, b]) {
    const aType = a.sourceType,
        bType = b.sourceType

    if (aType === bType)
        return aType
    if (aType === DATA_TYPES.FLOAT && bType.toString().includes("vec"))
        return bType
    else
        return aType
}