import PropTypes from "prop-types"
import React, {useMemo, useState} from "react"
import Node from "./Node"
import styles from "../styles/Board.module.css"
import handleDropBoard from "../utils/handleDropBoard"

import handleBoardScroll from "../utils/handleBoardScroll"
import useBoard from "../hooks/useBoard"
import getBoardOptions from "../utils/getBoardOptions"
import OnDragProvider from "../context/DragProvider"
import SelectBox from "../../../../components/select-box/SelectBox"
import Comment from "./Comment"
import useContextTarget from "../../../../components/context/hooks/useContextTarget"
import BOARD_SIZE from "../data/BOARD_SIZE"
import handleDropNode from "../utils/handleDropNode"
import LINK_WIDTH from "../data/LINK_WIDTH"

const TRIGGERS = [
    "data-node",
    "data-board",
    "data-link",
    "data-group"
]
export default function Board(props) {
    const {
        links,
        ref,
        handleLink,
        internalID
    } = useBoard(props.hook)

    const boardOptions = useMemo(() => {
        return getBoardOptions(
            (nodes, event) => handleDropNode(nodes, event, ref, props.hook),
            props.setSelected,
            props.hook,
            links,
            props.allNodes,
            (t) => {
                props.hook.setChanged(true)
                props.hook.setImpactingChange(true)
                props.hook.setLinks(prev => {
                    return prev.filter(l => {
                        const test = {
                            t: l.target.id + l.target.attribute.key,
                            s: l.source.id + l.source.attribute.key,
                        }
                        return (test.t + "-" + test.s) !== t
                    })
                })
            },
            (attr) => {
                props.hook.setChanged(true)
                props.hook.setNodes(prev => prev.filter(pr => pr.id !== attr))
            }
        )
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
    useContextTarget(
        internalID,
        boardOptions,
        TRIGGERS
    )

    return (
        <OnDragProvider.Provider value={{setDragType, dragType}}>
            <div className={styles.context}>
                <SelectBox
                    nodes={props.hook.nodes}
                    selected={props.selected}
                    targetElementID={internalID}
                    setSelected={props.setSelected}
                />
                <svg
                    id={internalID}
                    onDragOver={e => e.preventDefault()}
                    onContextMenu={e => e.preventDefault()}

                    data-board={"BOARD"}
                    style={{
                        transformOrigin: "center center",
                        height: BOARD_SIZE + "px",
                        width: BOARD_SIZE + "px",
                    }}

                    onDrop={event => {
                        event.preventDefault()
                        const nodes = handleDropBoard(event.dataTransfer.getData("text"), props.allNodes)
                        if (nodes)
                            handleDropNode(nodes, event, ref, props.hook)

                    }}
                    ref={ref}
                    className={[styles.wrapper, styles.background].join(" ")}
                    onMouseDown={e => {
                        if (e.button === 2)
                            handleBoardScroll(ref.current.parentNode)
                        if (e.target === ref.current)
                            props.setSelected([])

                    }}
                >
                    {props.hook.nodes?.map(node => node.isComment ? (
                        <React.Fragment key={node.id}>
                            <Comment
                                setSelected={(i) => props.setSelected([i])}
                                submitName={newName => {
                                    props.hook.setNodes(prev => {
                                        return prev.map(p => {
                                            if (p.id === node.id)
                                                p.name = newName

                                            return p
                                        })
                                    })
                                }}
                                onDragStart={() => props.hook.setChanged(true)}
                                selected={props.selected}
                                node={node}
                            />
                        </React.Fragment>
                    ) : null)}
                    {links.map(l => (
                        <path
                            data-link={l.target + "-" + l.source}
                            fill={"none"}
                            stroke={"#fff"}
                            strokeWidth={LINK_WIDTH}
                            key={l.target + "-" + l.source}
                            id={l.target + "-" + l.source}
                        />
                    ))}
                    {props.hook.nodes.map(node => !node.isComment ? (
                        <React.Fragment key={node.id}>
                            <Node
                                links={links} path={window.fileSystem.path}
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
                                handleLink={handleLink}/>
                        </React.Fragment>
                    ) : null)}
                </svg>
            </div>
        </OnDragProvider.Provider>
    )
}
Board.propTypes = {
    allNodes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        dataTransfer: PropTypes.string,
        tooltip: PropTypes.string,
        icon: PropTypes.node,
        getNewInstance: PropTypes.func
    })).isRequired,
    hook: PropTypes.object,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func
}