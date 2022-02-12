import PropTypes from "prop-types";
import styles from '../../styles/Node.module.css'
import React from 'react'
import useNode from "../../hooks/useNode";
import NodeIO from "./NodeIO";
import NodeShowcase from "./NodeShowcase";

export default function Node(props) {
    const {
        selected,
        ref,
        handleDragStart,
        handleLinkDrag,
        height,
        pathRef,
        outputLinks,
        inputLinks
    } = useNode(props)

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
                        outline: selected ? 'var(--fabric-accent-color) 2px solid' : undefined
                    }}>
                    <div
                        className={styles.label}
                        onMouseDown={ev => handleDragStart(ev, props.node, props.handleChange)}>
                        <div className={'material-icons-round'}
                             style={{fontSize: '1.2rem'}}>drag_indicator
                        </div>
                        {props.node.name}
                        {props.node.instanceOf === (Response.constructor.name)}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.column}>
                            {props.node.inputs.map((a, i) =>
                                a.accept !== undefined ?
                                    (
                                        <React.Fragment key={a.key + '-input-' + i}>
                                            <NodeIO
                                                handleLink={props.handleLink}
                                                setAlert={props.setAlert}
                                                nodeID={props.node.id}
                                                onDragEnd={() => {
                                                    pathRef.current.setAttribute('d', undefined)
                                                }}
                                                data={a}
                                                handleLinkDrag={handleLinkDrag}
                                                links={inputLinks}
                                                type={'input'}
                                            />
                                        </React.Fragment>
                                    )
                                    :
                                    null)}
                            <NodeShowcase node={props.node}/>
                        </div>
                        <div className={styles.column} style={{justifyContent: 'flex-end'}}>
                            {props.node.output.map((a, i) => (
                                <React.Fragment key={a.key + '-output-' + i}>
                                    <NodeIO
                                        setAlert={props.setAlert}
                                        nodeID={props.node.id}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        data={a}
                                        handleLinkDrag={handleLinkDrag}
                                        links={outputLinks}
                                        type={'output'}
                                    />
                                </React.Fragment>
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
                strokeDasharray={'3,3'}
            />
        </g>
    )
}
Node.propTypes = {
    links: PropTypes.array,
    setAlert: PropTypes.func,
    node: PropTypes.object.isRequired,
    scale: PropTypes.number,
    handleLink: PropTypes.func,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
}