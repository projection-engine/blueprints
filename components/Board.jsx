import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import Node from "./node/Node";
import styles from '../styles/Board.module.css'
import handleDropBoard from "../utils/handleDropBoard";

import handleBoardScroll from "../utils/handleBoardScroll";
import useBoard from "../hooks/useBoard";
import {ContextMenu} from "@f-ui/core";
import getBoardOptions from "../utils/getBoardOptions";
import OnDragProvider from "../hooks/OnDragProvider";
import SelectBox from "./SelectBox";
import deleteNode, {removeLink} from "../utils/deleteNode";


export default function Board(props) {
    const {

        scale,
        links,
        ref,
        handleLink
    } = useBoard(props.hook, props.setAlert, props.parentRef)

    const handleDropNode = (n, e) => {
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
        n.x = (current.x - 100) / scale
        n.y = (current.y - 25) / scale
        props.hook.setNodes(prev => {
            return [...prev, n]
        })
    }
    const boardOptions = useMemo(() => {
        return getBoardOptions((n, mouseInfo) => {
            handleDropNode(n, mouseInfo)
        })
    }, [props.hook.nodes])
    const [dragType, setDragType] = useState()
    const setSelected = (i) => {
        if(i && !props.selected.find(e => e === i))
            props.setSelected(prev => {
                return [...prev, i]
            })
        else if(props.selected.find(e => e === i))
            props.setSelected(prev => {
                const copy = [...prev]
                copy.splice(copy.indexOf(i), 1)
                return copy
            })
    }

    return (
        <OnDragProvider.Provider value={{setDragType, dragType}}>
            <ContextMenu
                options={[
                    ...boardOptions,
                    {
                        requiredTrigger: 'data-node',
                        label: 'Edit',
                        icon: <span className={'material-icons-round'}>edit</span>,
                        onClick: (node) => {
                            setSelected(node.getAttribute('data-node'))
                        }
                    },
                    {
                        requiredTrigger: 'data-node',
                        label: 'Delete',
                        icon: <span className={'material-icons-round'}>delete</span>,
                        onClick: (node) => {
                            deleteNode(node.getAttribute('data-node'), props.hook)
                        }
                    },
                    {
                        requiredTrigger: 'data-link',
                        label: 'Break link',
                        icon: <span className={'material-icons-round'}>link_off</span>,
                        onClick: (node) => {
                            removeLink(links.find(l => (l.target + '-' + l.source) === node.getAttribute('data-link')), props.hook)
                        }
                    },

                ]}
                triggers={[
                    'data-node',
                    'data-board',
                    'data-link'
                ]}
                styles={{
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    position: 'relative'
                }}>
                <SelectBox nodes={props.hook.nodes} selected={props.selected} setSelected={props.setSelected}/>
                <svg
                    onDragOver={e => e.preventDefault()}
                    data-board={'self'}
                    style={{

                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        height: '10000px',
                        width: '10000px',

                    }}
                    onContextMenu={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        const n = handleDropBoard(e.dataTransfer.getData('text'))
                        if (n) {
                            handleDropNode(n, e)
                        }
                    }}
                    ref={ref}
                    className={[styles.wrapper, styles.background].join(' ')}
                    onMouseDown={e => {
                        if (e.button === 2)
                            handleBoardScroll(ref.current.parentNode, e)

                        if (e.target === ref.current)
                            props.setSelected([])
                    }}
                >
                    {props.hook.nodes.map(node => (
                        <React.Fragment key={node.id}>
                            <Node
                                links={links}
                                setAlert={props.setAlert}
                                setSelected={(i, multi) => {
                                    if(multi)
                                        setSelected(i)
                                    else
                                        props.setSelected([i])
                                }}
                                selected={props.selected}
                                node={node}
                                scale={scale}
                                handleLink={handleLink}/>
                        </React.Fragment>
                    ))}
                    {links.map((l, i) => (
                        <g key={l.target + '-' + l.source} className={styles.link}>

                            <path
                                data-link={l.target + '-' + l.source}
                                fill={'none'}
                                stroke={'var(--fabric-accent-color)'}
                                id={l.target + '-' + l.source}/>
                            <path
                                data-link={l.target + '-' + l.source}
                                fill={'none'}
                                stroke={'transparent'}
                                strokeWidth={'10'}

                                id={l.target + '-' + l.source + '-supplementary'}/>
                        </g>
                    ))}
                </svg>
            </ContextMenu>
        </OnDragProvider.Provider>
    )
}
Board.propTypes = {
    setAlert: PropTypes.func.isRequired,
    parentRef: PropTypes.object,
    hook: PropTypes.object,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func,
}