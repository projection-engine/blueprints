import {useEffect, useMemo, useRef, useState} from "react"
import getBezierCurve from "../utils/board/bezierCurve"
import NODE_TYPES from "../templates/NODE_TYPES"
import NODE_INFO from "../templates/NODE_INFO"
import dragNode from "../utils/dragNode"

export default function useNode({
    selected, setSelected, node, hidden, scale, grid,
    onDragStart,  links
}) {

    const isSelected = useMemo(() => selected.indexOf(node.id) > -1, [selected])
    const ref = useRef()
    const pathRef = useRef()

    const [height, setHeight] = useState()
    useEffect(() => {
        const h = ref.current.firstChild.scrollHeight
        setHeight(h >= 35 ? h : 55)
    }, [hidden])

    const handleLinkDrag = (event) => {
        const parent = ref.current?.parentNode.parentNode
        const bBox = event.currentTarget.getBoundingClientRect()
        let parentBBox = parent.getBoundingClientRect()
        const bounding = {
            x: parent.scrollLeft - parentBBox.left,
            y: parent.scrollTop - parentBBox.top
        }

        const curve = getBezierCurve(
            {
                x: (bBox.x + bounding.x + 7.5) / scale,
                y: (bBox.y + bounding.y + 7.5) / scale
            },
            {
                x1: (event.clientX + bounding.x + 7.5) / scale,
                y1: (event.clientY + bounding.y + 7.5) / scale
            })

        pathRef.current?.setAttribute("d", curve)
    }

 
    const handleDragStart = (event) => {
        let isFirst, alreadyFound = false
        document.elementsFromPoint(event.clientX, event.clientY)
            .forEach(e => {
                if (e.id?.includes("-node") && !alreadyFound && e.id === (node.id + "-node"))
                    isFirst = true
                else if (e.id?.includes("-node") && !alreadyFound)
                    alreadyFound = true
            })

        if (event.button === 0 && isFirst && !isSelected)
            setSelected(node.id, event.ctrlKey)
        if (event.button === 0 && ((isSelected && event.ctrlKey) || isFirst)) {
            if(isFirst)
                onDragStart()
            dragNode(event, ref.current, ref.current.parentNode.parentNode, grid, scale)
        }
    }

    const outputLinks = useMemo(() => links.filter(l => l.source.includes(node.id)), [links])
    const inputLinks = useMemo(() => links.filter(l => l.target.includes(node.id)), [links])

    useEffect(() => {
        document.addEventListener("mousedown", handleDragStart)
        return () => document.removeEventListener("mousedown", handleDragStart)
    }, [node,  selected, isSelected, scale, grid])


    const nodeInfo = useMemo(() => {
        let key = (Object.entries(NODE_TYPES).find(([, value]) => value === node.type))
        if (key)
            key = key[0]

        return NODE_INFO[key] ? NODE_INFO[key] : {}

    }, [])

    const width = useMemo(() => {
        switch (node.size){
        case 0:
            return "225px"
        case 1:
            return "150px"
        default:
            return "135px"
        }
    }, [])

    return {
        nodeInfo, width,
        selected: isSelected,
        outputLinks,
        inputLinks,
        ref,
        handleLinkDrag,
        height,
        pathRef
    }
}