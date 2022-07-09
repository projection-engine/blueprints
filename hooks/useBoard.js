import {useEffect, useMemo, useRef, useState} from "react"
import getBezierCurve from "../utils/board/bezierCurve"
import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import TYPES_INFO from "../templates/DATA_INFO"

export default function useBoard(hook) {
    const ref = useRef()
    const mappedLinks = useRef([])
    const links = useMemo(() => {
        return hook.links.map(l => {
            let key = (Object.entries(DATA_TYPES).find(([, value]) => value === l.source.attribute.type))
            if (key)
                key = key[0]

            return {
                target: l.target.id + l.target.attribute.key,
                source: l.source.id + l.source.attribute.key,
                targetKey: l.target.attribute.key,
                sourceKey: l.source.attribute.key,
                color: TYPES_INFO[key],
                sourceType: l.source.attribute.type,
                targetType: l.target.attribute.type
            }
        })
    }, [hook.links])

    const updateLinks = () => {
        const scale = window.blueprints.scale
        try {
            let parentBBox = ref.current?.getBoundingClientRect()
            const bounding = {
                x: ref.current?.scrollLeft - parentBBox.left,
                y: ref.current?.scrollTop - parentBBox.top
            }

            for (let i = 0; i < mappedLinks.current.length; i++) {
                const {
                    target,
                    source,
                    linkPath
                } = mappedLinks.current[i]

                if (target && source && linkPath) {
                    const sourceBBox = source.getBoundingClientRect(),
                        targetBBox = target.getBoundingClientRect()
                    const curve = getBezierCurve(
                        {
                            x: (sourceBBox.x + bounding.x + 7.5) / scale,
                            y: (sourceBBox.y + bounding.y + 7.5) / scale
                        },
                        {
                            x1: (targetBBox.x + bounding.x + 7.5) / scale,
                            y1: (targetBBox.y + bounding.y + 7.5) / scale
                        })

                    if (linkPath.getAttribute("d") !== curve)
                        linkPath.setAttribute("d", curve)
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleWheel = (e) => {
        e.preventDefault()
        let s = window.blueprints.scale
        if (e.wheelDelta > 0 && s < 3)
            s += s * .1
        else if (e.wheelDelta < 0 && s >= .5)
            s -= s * .1

        ref.current.style.transform = "scale(" + s + ")"
        window.blueprints.scale = s
        updateLinks()
    }



    const handleLink = (src, target, isExecution) => {
        hook.setLinks(prev => {
            let c = [...prev]
            const existing = c.filter(c => (c.target.id === target.id && c.target.attribute.key === target.attribute.key) || (isExecution && c.source.id === src.id && c.source.attribute.key === src.attribute.key))
            c = c.filter(cc => {
                return !existing.find(e => e === cc)
            })
            if (!target.attribute.componentRequired || src.attribute.components.includes(target.attribute.componentRequired)) {
                hook.setChanged(true)
                hook.setImpactingChange(true)
                c.push({
                    source: src,
                    target: target
                })
            } else
                alert.pushAlert("Missing component on entity", "error")
            return c
        })
    }

    useEffect(() => {
        ref.current?.parentNode.addEventListener("wheel", handleWheel, {passive: false})
        return () => ref.current?.parentNode.removeEventListener("wheel", handleWheel, {passive: false})
    }, [])

    useEffect(() => {
        if (mappedLinks.current.length !== links.length)
            mappedLinks.current = links.map(l => {
                const linkPath = document.getElementById(l.target + "-" + l.source)
                return {
                    target: document.getElementById(l.target),
                    source: document.getElementById(l.source),
                    linkPath
                }
            })
        updateLinks()
        const mt = new MutationObserver(updateLinks)
        mt.observe(ref.current, {subtree: true, childList: true, attributes: true})
        return () => mt.disconnect()
    }, [links])

    return {
        links,
        ref,
        handleLink
    }
}