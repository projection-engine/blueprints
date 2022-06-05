import PropTypes from "prop-types"
import React, {useContext, useMemo, useRef, useState} from "react"
import Node from "./Node"
import styles from "../styles/Board.module.css"
import handleDropBoard from "../utils/handleDropBoard"

import handleBoardScroll from "../utils/handleBoardScroll"
import useBoard from "../hooks/useBoard"
import {ContextWrapper} from "@f-ui/core"
import getBoardOptions from "../utils/getBoardOptions"
import OnDragProvider from "../hooks/DragProvider"
import SelectBox from "../../../../../components/selectbox/SelectBox"
import Context from "./Context"
import deleteNode from "../utils/deleteNode"
import Group from "./Group"
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider"

export default function Board(props) {
    const {scale, setScale} = props
    const {
        links,
        ref,
        handleLink
    } = useBoard(props.hook, scale, setScale)
    const quickAccess=  useContext(QuickAccessProvider)
    const handleDropNode = (dataToPush, e) => {

        const doIt=  (n, e) => {
            if (n.unique && !props.hook.nodes.find(node => node.constructor.name === n.constructor.name) || !n.unique) {
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
                return n
            } else
                props.setAlert({message: "Cannot add two instances of " + n.name, type: "error"})
        }
        if(Array.isArray(dataToPush)) {
            const result = dataToPush.map(d => doIt(d, e)).flat()
            console.log(result)
            props.hook.setChanged(true)
            props.hook.setNodes(prev => {
                return [...prev, ...result]
            })
        }
        else {
            props.hook.setChanged(true)
            props.hook.setNodes(prev => {
                return [...prev,  doIt(dataToPush, e)]
            })
        }
    }
    const boardOptions = useMemo(() => {
        return getBoardOptions((n, mouseInfo) => {
            handleDropNode(n, mouseInfo)
        }, props.setSelected, props.hook, links, props.allNodes)
    }, [props.hook.nodes, props.hook.links, links])

    const [dragType, setDragType] = useState()
    const setSelected = (i) => {
        if (i && !props.selected.find(e => e === i))
            props.setSelected(prev => {
                return [...prev, i]
            })
        else if (props.selected.find(e => e === i))
            props.setSelected(prev => {
                const copy = [...prev]
                copy.splice(copy.indexOf(i), 1)
                return copy
            })
    }

    const coords = useRef({clientX: 0, clientY: 0})

    return (
        <OnDragProvider.Provider value={{setDragType, dragType}}>
            <ContextWrapper
                styles={{display: props.hide ? "none" : undefined}}
                options={boardOptions}
                wrapperClassName={styles.contextWrapper}
                content={(s, handleClose) => (
                    <Context
                        deleteNode={() => {
                            deleteNode(s.getAttribute("data-node"), props.hook, props.setSelected)
                        }}
                        handleClose={handleClose}
                        scale={scale}
                        deleteGroup={() => {
                            const attr = s.getAttribute("data-group")
                            props.hook.setChanged(true)
                            props.hook.setGroups(prev => prev.filter(pr => pr.id !== attr))
                        }}
                        deleteLink={() => {
                            props.hook.setChanged(true)
                            props.hook.setImpactingChange(true)
                            const t = s.getAttribute("data-link")

                            props.hook.setLinks(prev => {
                                return prev.filter(l => {
                                    const test = {
                                        t: l.target.id + l.target.attribute.key,
                                        s: l.source.id + l.source.attribute.key,
                                    }
                                    return (test.t + "-" + test.s) !== t
                                })
                            })
                        }}
                        availableNodes={props.allNodes}
                        onSelect={(dataTransfer) => {
                            handleDropNode(handleDropBoard(dataTransfer, props.allNodes), coords.current)
                        }}
                        selected={s}
                        setSelected={props.setSelected}
                    />
                )}
                triggers={[
                    "data-node",
                    "data-board",
                    "data-link",
                    "data-group"
                ]}
                className={styles.context}
            >

                <SelectBox nodes={[...props.hook.groups, ...props.hook.nodes]} selected={props.selected}
                    setSelected={props.setSelected}/>
                <svg
                    onDragOver={e => e.preventDefault()}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        height: "10000px",
                        width: "10000px",
                    }}
                    data-board={"self"}
                    onContextMenu={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        let allow = true, newEntities

                        if (props.onDrop) {
                            const res = props.onDrop(e)
                            allow = res.allow
                            newEntities = res.entities
                        }
                        if (allow) {
                            const n = newEntities ? newEntities : handleDropBoard(e.dataTransfer.getData("text"), props.allNodes)
                            if(n)
                                handleDropNode(n, e)
                        }
                    }}
                    ref={ref}
                    className={[styles.wrapper, styles.background].join(" ")}
                    onMouseDown={e => {
                        if (e.button === 2) {
                            handleBoardScroll(ref.current.parentNode, e)
                            coords.current = {clientX: e.clientX, clientY: e.clientY }
                        }

                        if (e.target === ref.current) {
                            props.setSelected([])
                            if (props.onEmptyClick)
                                props.onEmptyClick()
                        }

                    }}
                >

                    {props.hook.groups?.map(group => (
                        <React.Fragment key={group.id}>
                            <Group
                                setSelected={(i) => {
                                    props.setSelected([i])
                                }}
                                submitName={newName => {
                                    props.hook.setGroups(prev => {
                                        return prev.map(p => {
                                            if (p.id === group.id)
                                                p.name = newName

                                            return p
                                        })
                                    })
                                }}
                                onDragStart={() => props.hook.setChanged(true)}
                                selected={props.selected}
                                group={group}
                                scale={scale}
                            />
                        </React.Fragment>
                    ))}
                    {links.map(l => (
                        <g key={l.target + "-" + l.source} className={styles.link}>

                            <path
                                data-link={l.target + "-" + l.source}
                                fill={"none"}
                                stroke={l.color}
                                id={l.target + "-" + l.source}/>
                            <path
                                data-link={l.target + "-" + l.source}
                                fill={"none"}
                                stroke={"transparent"}
                                strokeWidth={"10"}

                                id={l.target + "-" + l.source + "-supplementary"}/>
                        </g>
                    ))}
                    {props.hook.nodes.map(node => (
                        <React.Fragment key={node.id}>
                            <Node
                                links={links} path={quickAccess.fileSystem.path}
                                setAlert={props.setAlert}
                                hidden={props.hide}
                                submitBundledVariable={(key, value) => {
                                    props.hook.setChanged(true)
                                    props.hook.setNodes(prev => {
                                        return prev.map(p => {
                                            if (p.id === node.id)
                                                p[key] = value
                                            return p
                                        })
                                    })
                                }}
                                setSelected={(i, multi) => {
                                    if (multi)
                                        setSelected(i)
                                    else
                                        props.setSelected([i])
                                }}
                                onDragStart={() => props.hook.setChanged(true)}
                                selected={props.selected}
                                node={node}
                                scale={scale}
                                handleLink={handleLink}/>
                        </React.Fragment>
                    ))}
                </svg>
            </ContextWrapper>
        </OnDragProvider.Provider>
    )
}
Board.propTypes = {
    id: PropTypes.any,
    onDrop: PropTypes.func,
    allNodes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        dataTransfer: PropTypes.string,
        tooltip: PropTypes.string,
        icon: PropTypes.node,
        getNewInstance: PropTypes.func
    })).isRequired,
    onEmptyClick: PropTypes.func,
    setAlert: PropTypes.func.isRequired,
    hook: PropTypes.object,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func,
    hide: PropTypes.bool,
    scale: PropTypes.number,
    setScale: PropTypes.func
}