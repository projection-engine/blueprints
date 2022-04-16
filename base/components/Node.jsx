import PropTypes from "prop-types";
import styles from '../styles/Node.module.css'
import React, {useEffect, useMemo} from 'react'
import useNode from "../hooks/useNode";
import NodeIO from "./NodeIO";
import NodeShowcase from "./NodeShowcase";
import NODE_TYPES from "../NODE_TYPES";
import NODE_INFO from "../NODE_INFO";

export default function Node(props) {
    const selected = useMemo(() => {
        return props.selected.indexOf(props.node.id) > -1
    }, [props.selected])

    const {
        ref,
        handleDragStart,
        handleLinkDrag,
        height,
        pathRef,
        outputLinks,
        inputLinks
    } = useNode(props, selected, props.hidden)


    useEffect(() => {
        document.addEventListener('mousedown', handleDragStart)
        return () => {
            document.removeEventListener('mousedown', handleDragStart)
        }
    }, [props.node, props.selected, selected, props.scale])

    const nodeInfo = useMemo(() => {
        let key = (Object.entries(NODE_TYPES).find(([_, value]) => value === props.node.type))
        if (key)
            key = key[0]

        return NODE_INFO[key] ? NODE_INFO[key] : {}

    }, [])

    const width = useMemo(() => {
        switch (props.node.size){
            case 0:
                return '225px'
            case 1:
                return '150px'
            case 2:
                return '135px'
        }
    }, [])
    return (
        <g>
            <g
                ref={ref}
                transform={`translate(${props.node.x} ${props.node.y})`}
            >
                <foreignObject
                    data-node={props.node.canBeDeleted ? props.node.id : undefined}
                    id={props.node.id}

                    className={styles.wrapper}

                    style={{
                        width: width,
                        height: height + 'px',
                        outline: selected ? 'yellow 2px solid' : undefined
                    }}>
                    <div
                        className={styles.label}
                        style={{borderColor: nodeInfo.COLOR}}
                        id={props.node.id + '-node'}
                        title={nodeInfo.LABEL}
                    >
                        <span style={{fontSize: '1rem', transform: nodeInfo.ROTATE ? `rotate(${nodeInfo.ROTATE}`: undefined}} className={'material-icons-round'}>{nodeInfo.ICON}</span>
                        {props.node.name}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.column}>
                            {props.node.inputs.filter(a => Array.isArray(a.accept) || a.bundled).map((a, i) => (
                                <React.Fragment key={a.key + '-input-' + i}>
                                    <NodeIO
                                        submitBundledVariable={data => props.submitBundledVariable(a.key, data)}
                                        handleLink={props.handleLink}
                                        setAlert={props.setAlert}
                                        nodeID={props.node.id}
                                        node={props.node}
                                        onDragEnd={() => {
                                            pathRef.current.setAttribute('d', undefined)
                                        }}
                                        data={a}
                                        handleLinkDrag={handleLinkDrag}
                                        inputLinks={inputLinks}
                                        outputLinks={outputLinks}
                                        type={'input'}
                                    />
                                </React.Fragment>
                            ))}
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
                                        inputLinks={inputLinks}
                                        outputLinks={outputLinks}
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
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    hidden: PropTypes.bool
}