import PropTypes from "prop-types"
import styles from "../styles/Node.module.css"
import React from "react"
import useNode from "../hooks/useNode"
import NodeIO from "./NodeIO"
import NodeShowcase from "./NodeShowcase"
import {Icon} from "@f-ui/core"

export default function Node(props) {
    const {
        nodeInfo, width,
        ref, handleLinkDrag,
        height, pathRef,
        outputLinks, inputLinks,
        selected
    } = useNode(props)


    return (
        <g>
            <g
                ref={ref}
                transform={`translate(${props.node.x} ${props.node.y})`}
            >
                <foreignObject
                    data-node={props.node.canBeDeleted ? props.node.id : undefined}
                    id={props.node.id}
                    onContextMenu={() => {
                        props.setSelected(props.node.id)
                    }}

                    className={styles.wrapper}

                    style={{
                        width: width,
                        height: height + "px",
                        outline: selected ? "yellow 2px solid" : undefined
                    }}>
                    <div
                        className={styles.label}
                        style={{borderColor: nodeInfo.COLOR}}
                        id={props.node.id + "-node"}
                        title={nodeInfo.LABEL}
                    >
                        <Icon styles={{fontSize: "1rem", transform: nodeInfo.ROTATE ? `rotate(${nodeInfo.ROTATE}`: undefined}}>{nodeInfo.ICON}</Icon>
                        {props.node.name}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.column}>
                            {props.node.inputs?.filter(a => Array.isArray(a.accept) || a.bundled).map((a, i) => (
                                <React.Fragment key={a.key + "-input-" + i}>
                                    <NodeIO
                                        submitBundledVariable={data => props.submitBundledVariable(a.key, data)}
                                        handleLink={props.handleLink}
                                        nodeID={props.node.id}
                                        node={props.node}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute("d", undefined)
                                        }}
                                        data={a}
                                        handleLinkDrag={handleLinkDrag}
                                        inputLinks={inputLinks}
                                        outputLinks={outputLinks}
                                        type={"input"}
                                    />
                                </React.Fragment>
                            ))}
                            <NodeShowcase path={props.path} node={props.node}/>
                        </div>
                        <div className={styles.column} style={{justifyContent: "flex-end"}}>
                            {props.node.output.map((a, i) => (
                                <React.Fragment key={a.key + "-output-" + i}>
                                    <NodeIO
                                        node={props.node}
                                        nodeID={props.node.id}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute("d", undefined)
                                        }}
                                        data={a}

                                        handleLinkDrag={handleLinkDrag}
                                        inputLinks={inputLinks}
                                        outputLinks={outputLinks}
                                        type={"output"}
                                    />
                                </React.Fragment>
                            ))}
                        </div>

                    </div>
                </foreignObject>
            </g>
            <path
                ref={pathRef}
                fill={"none"}
                stroke={"var(--pj-accent-color)"}
                strokeWidth={"2"}
                strokeDasharray={"3,3"}
            />
        </g>
    )
}
Node.propTypes = {
    submitBundledVariable: PropTypes.func,
    links: PropTypes.array,
    node: PropTypes.object.isRequired,
    handleLink: PropTypes.func,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    hidden: PropTypes.bool,
    path: PropTypes.string
}