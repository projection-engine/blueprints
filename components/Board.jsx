import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import Node from "./Node";

export default function Board(props) {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    const ref = useRef()
    let resizeObs

    const callback = () => {
        setWidth(ref.current?.parentNode.offsetWidth)
        setHeight(ref.current?.parentNode.offsetHeight)
    }
    useEffect(() => {
        if (!resizeObs)
            resizeObs = new ResizeObserver(callback)
        resizeObs.observe(ref.current?.parentNode)
        callback()
    }, [])

    return (
        <svg width={width} height={height} ref={ref}>
            {props.nodes.map(node => (
                <Node node={node}/>
            ))}
        </svg>
    )
}
Board.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object)
}