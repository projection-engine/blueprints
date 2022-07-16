import PropTypes from "prop-types"
import styles from "../../styles/Node.module.css"
import React from "react"
import useNode from "../../hooks/useNode"
import NodeShowcase from "./NodeShowcase"
import {Icon} from "@f-ui/core"
import LINK_WIDTH from "../../data/LINK_WIDTH"
import Input from "./Input"
import Output from "./Output"
import NodeProvider from "../../context/NodeProvider"

export default function Node(props) {
    const {
        nodeInfo, width,
        ref, handleLinkDrag,
        height, pathRef,
        outputLinks,
        inputLinks,
        selected
    } = useNode(props)

    return (
        <NodeProvider.Provider value={props.node}>
            <g>
                <g
                    ref={ref}
                    transform={`translate(${props.node.x} ${props.node.y})`}
                >
                    <foreignObject
                        data-node={props.node.canBeDeleted ? props.node.id : undefined}
                        id={props.node.id}
                        onMouseDown={(e) => props.setSelected(props.node.id, e.ctrlKey)}
                        className={styles.wrapper}
                        style={{
                            width: width,
                            height: height + "px",
                            outline: selected ? "yellow 2px solid" : undefined
                        }}
                    >
                        <div
                            className={styles.label}
                            style={{borderColor: nodeInfo.COLOR}}
                            id={props.node.id + "-node"}
                            title={nodeInfo.LABEL}
                        >
                            {props.node.name}
                        </div>
                        <div className={styles.content}>
                            <div className={styles.column}>
                                {props.node.inputs?.filter(a => Array.isArray(a.accept) || a.bundled).map((a, i) => (
                                    <React.Fragment key={a.key + "-input-" + i}>
                                        <Input
                                            handleLink={props.handleLink}
                                            data={a}
                                            inputLinks={inputLinks}
                                        />
                                    </React.Fragment>
                                ))}
                                <NodeShowcase/>
                            </div>
                            <div className={styles.column} style={{justifyContent: "flex-end"}}>
                                {props.node.output.map((a, i) => (
                                    <React.Fragment key={a.key + "-output-" + i}>
                                        <Output
                                            onDragEnd={() => pathRef.current.setAttribute("d", undefined)}
                                            data={a}
                                            handleLinkDrag={handleLinkDrag}
                                            inputLinks={inputLinks}
                                            outputLinks={outputLinks}
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
                    strokeWidth={LINK_WIDTH}
                    strokeDasharray={"3,3"}
                />
            </g>
        </NodeProvider.Provider>
    )
}
Node.propTypes = {
    links: PropTypes.array,
    node: PropTypes.object.isRequired,
    handleLink: PropTypes.func,
    selected: PropTypes.array,
    setSelected: PropTypes.func
}