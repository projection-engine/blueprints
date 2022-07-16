import styles from "../../styles/Node.module.css"
import PropTypes from "prop-types"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import React, {useContext, useMemo, useRef} from "react"
import OnDragProvider from "../../context/DragProvider"
import {Icon} from "@f-ui/core"
import NodeProvider from "../../context/NodeProvider"
import linkNodes from "../../utils/linkNodes"

export default function Input(props) {
    const node = useContext(NodeProvider)
    const wrapperRef = useRef()
    const onDragContext = useContext(OnDragProvider)
    const link = useMemo(
        () => props.inputLinks.find(o => o.targetKey === props.data.key),
        [props.inputLinks]
    )


    return (
        <div
            data-link={link ? (link.target + "-" + link.source) : null}
            className={styles.attribute} ref={wrapperRef}
            data-dtype={"input"}
            data-disabled={`${props.data.disabled || props.data.type === DATA_TYPES.UNDEFINED && (props.inputLinks.length === 0 && node.inputs.length > 0)}`}
            style={{justifyContent: "flex-start"}}>

            <div
                id={node.id + props.data.key}
                className={styles.connection}
                data-dtype={"input"}
                data-disabled={`${props.data.disabled || props.data.type === DATA_TYPES.UNDEFINED && (props.inputLinks.length === 0 && node.inputs.length > 0)}`}
                data-highlight={link ? "-" : undefined}
                onDrop={e => {
                    e.preventDefault()
                    onDragContext.setDragType(undefined)
                    if (!props.data.disabled)
                        linkNodes(e, props.data, node, props.handleLink)
                }}
            />

            <div
                className={styles.overflow}
                style={{color: props.data.color}}
            >
                {props.data.label}
            </div>
        </div>
    )
}


Input.propTypes = {
    handleLink: PropTypes.func,
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
    inputLinks: PropTypes.arrayOf(PropTypes.object).isRequired
}
