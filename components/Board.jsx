import PropTypes from "prop-types";
import React from "react";
import Node from "./Node";
import styles from '../styles/Board.module.css'
import handleDropBoard from "../utils/handleDropBoard";
import ContextMenu from "../../context/ContextMenu";
import handleBoardScroll from "../utils/handleBoardScroll";
import useBoard from "../hooks/useBoard";


export default function Board(props) {
    const {
        width,
        height,
        scale,
        links,
        ref,
        handleLink
    } = useBoard(props.hook, props.setAlert, props.parentRef)

    return (
        <ContextMenu
            options={[
                {
                    requiredTrigger: 'data-node',
                    label: 'Edit',
                    icon: <span className={'material-icons-round'}>edit</span>,
                    onClick: (node) => {
                     props.setSelected(node.getAttribute('data-node'))
                    }
                },
                {
                    requiredTrigger: 'data-node',
                    label: 'Delete',
                    icon: <span className={'material-icons-round'}>delete</span>,
                    onClick: (node) => {
                        const target = node.getAttribute('data-node')

                            props.setSelected(undefined)
                        props.hook.setNodes(prev => {
                            let n = [...prev]
                            n.splice(n.findIndex(el => el.id === target), 1)
                            return n
                        })
                        props.hook.setLinks(prev => {
                            let n = [...prev]
                            let found
                            do {
                                found = n.findIndex(el => el.target.id === target || el.source.id === target)
                                if (found > -1)
                                    n.splice(found, 1)
                            } while (found > -1 || found === undefined)
                            return n
                        })
                    }
                },
                {
                    requiredTrigger: 'data-link',
                    label: 'Break link',
                    icon: <span className={'material-icons-round'}>link_off</span>,
                    onClick: (node) => {

                    }
                },
                // {
                //     requiredTrigger: 'data-board',
                //     label: 'Break link',
                //     icon: <span className={'material-icons-round'}>link_off</span>,
                //     onClick: (node) => {
                //
                //     }
                // },
            ]}
            triggers={[
                'data-node',
                'data-board',
                'data-link'
            ]}
            styles={{
                overflow: 'auto',
                width: '100%',
                height: '100%',
                borderRadius: '5px'
            }} className={styles.background}>
            <svg
                onDragOver={e => e.preventDefault()}
                data-board={'self'}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    height: height  * 2 + 'px',
                    width: width  * 2 + 'px',

                }}
                onContextMenu={e => e.preventDefault()}
                onDrop={e => {
                    e.preventDefault()
                    const n = handleDropBoard(e.dataTransfer.getData('text'))
                    if (n) {
                        const bounding = {
                            x: ref.current.scrollLeft - ref.current.getBoundingClientRect().left,
                            y: ref.current.scrollTop - ref.current.getBoundingClientRect().top
                        }
                        const mousePlacement = {
                            x: e.clientX + bounding.x,
                            y: e.clientY + bounding.y
                        }
                        const current = {
                            x: mousePlacement.x,
                            y: mousePlacement.y
                        }
                        n.x = (current.x - 100)/scale
                        n.y = (current.y - 25)/scale
                        props.hook.setNodes(prev => {
                            return [...prev, n]
                        })
                    }
                }}
                ref={ref}
                className={styles.wrapper}
                onMouseDown={e => {
                    if (e.button === 2)
                        handleBoardScroll(ref.current.parentNode, e)

                    if (e.target === ref.current)
                        props.setSelected(undefined)
                }}
            >
                {props.hook.nodes.map(node => (
                    <React.Fragment key={node.id}>
                        <Node
                            setAlert={props.setAlert}
                            setSelected={props.setSelected} selected={props.selected} node={node} scale={scale}
                            handleLink={handleLink}/>
                    </React.Fragment>
                ))}
                {links.map(l => (
                    <path
                        data-link={l.target + '-' + l.source}
                        fill={'none'}
                        stroke={'var(--fabric-accent-color)'}
                        strokeWidth={'2'}
                        key={l.target + '-' + l.source} id={l.target + '-' + l.source}/>
                ))}
            </svg>
        </ContextMenu>
    )
}
Board.propTypes = {
    setAlert: PropTypes.func.isRequired,
    parentRef: PropTypes.object,
    hook: PropTypes.object,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
}