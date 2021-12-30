import PropTypes from "prop-types";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Node from "./Node";
import styles from '../styles/Board.module.css'
import getBezierCurve from "../utils/bezierCurve";

export default function Board(props) {
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    const ref = useRef()
    let resizeObs

    const callback = () => {
        const p = ref.current?.parentNode
        setWidth(p.offsetWidth - p.firstChild.offsetWidth - p.lastChild.offsetWidth)
        setHeight(ref.current?.parentNode.offsetHeight)
    }
    useEffect(() => {
        if (!resizeObs)
            resizeObs = new ResizeObserver(callback)
        resizeObs.observe(ref.current?.parentNode)
        callback()
    }, [])


    const [scale, setScale] = useState(1)
    const handleLink = (src, target) => {
        props.hook.setLinks(prev => {
            return [...prev, {
                source: src,
                target: target
            }]
        })
    }
    const links = useMemo(() => {
        return props.hook.links.map(l => {
            return {target: l.target.id + l.target.attribute.key, source: l.source.id+ l.source.attribute.key}
        })
    }, [props.hook])

    let currentFrame = 0

    const updateLinks = () => {
        let parentBBox = ref.current.getBoundingClientRect()
        const bounding = {
            x: ref.current.scrollLeft - parentBBox.left,
            y: ref.current.scrollTop - parentBBox.top
        }

        links.forEach(l => {
            const target = document.getElementById(l.target)?.getBoundingClientRect()
            const source = document.getElementById(l.source)?.getBoundingClientRect()
            const linkPath = document.getElementById(l.target + '-' + l.source)
            if (target && source && linkPath)
                linkPath.setAttribute('d', getBezierCurve(
                    {
                        x: source.x + bounding.x+ 7.5,
                        y: source.y + bounding.y+ 7.5
                    },
                    {
                        x1: target.x + bounding.x+ 7.5,
                        y1: target.y + bounding.y+ 7.5
                    },))
        })
        currentFrame = requestAnimationFrame(updateLinks)
    }

    useEffect(() => {
        currentFrame = requestAnimationFrame(updateLinks)
        return () => {
            cancelAnimationFrame(currentFrame)
        }
    }, [links])
    return (
        <svg width={width} height={height} ref={ref} className={styles.wrapper}>
            {props.hook.nodes.map(node => (
              <React.Fragment key={node.id}>
                  <Node node={node} scale={scale} handleLink={handleLink}/>
              </React.Fragment>
            ))}
            {links.map(l => (
                <path
                    fill={'none'}
                    stroke={'#0095ff'}
                    strokeWidth={'2'}
                    key={l.target + '-' + l.source} id={l.target + '-' + l.source}/>
            ))}
        </svg>
    )
}
Board.propTypes = {
    hook: PropTypes.object
}