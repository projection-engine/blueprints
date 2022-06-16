import {useEffect, useMemo, useRef, useState} from "react"
import getBezierCurve from "../utils/board/bezierCurve"
import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import TYPES_INFO from "../templates/DATA_INFO"


export default function useBoard(hook, scale, setScale) {
    const ref = useRef()
    const handleWheel = (e) => {
        e.preventDefault()
        if (e.wheelDelta > 0 && scale < 3)
            setScale(scale + scale * .1)
        else if (e.wheelDelta < 0 && scale >= .5)
            setScale(scale - scale * .1)

    }
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        let resize
        if (!scrolled && hook.nodes.length > 0) {
            resize = new ResizeObserver(() => {
                let biggestX, biggestY
                hook.nodes.forEach(n => {
                    const cX = n.x
                    const cY = n.y

                    if (!biggestX || cX > biggestX)
                        biggestX = cX
                    if (!biggestY || cY > biggestY)
                        biggestY = cY
                })
                if (biggestX)
                    ref.current.parentNode.scrollLeft = biggestX - ref.current.parentNode.offsetWidth / 2

                if (biggestY)
                    ref.current.parentNode.scrollTop = biggestY - ref.current.parentNode.offsetHeight / 2


                setScrolled(true)
            })

            resize.observe(ref.current.parentNode)
        }
        return () => {
            if (resize)
                resize.disconnect()
        }
    }, [scrolled, hook.nodes])
    useEffect(() => {
        ref.current?.parentNode.addEventListener("wheel", handleWheel, {passive: false})
        return () => {
            ref.current?.parentNode.removeEventListener("wheel", handleWheel, {passive: false})
        }
    }, [scale])


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
    const links = useMemo(() => {
        return hook.links.map(l => {
            let key = (Object.entries(DATA_TYPES).find(([_, value]) => value === l.source.attribute.type))
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

    let currentFrame = 0

    const updateLinks = () => {
        if (hook.changed || hook.impactingChange)

            currentFrame = requestAnimationFrame(updateLinks)
    }

    let mappedLinks = []
    useEffect(() => {
        if (mappedLinks.length !== links.length)
            mappedLinks = links.map(l => {
                const linkPath = document.getElementById(l.target + "-" + l.source)
                return {
                    target: document.getElementById(l.target),
                    source: document.getElementById(l.source),
                    linkPath,
                    supplementary: linkPath.nextSibling
                }
            })
        const callback = () => {
            try {
                let parentBBox = ref.current?.getBoundingClientRect()
                const bounding = {
                    x: ref.current?.scrollLeft - parentBBox.left,
                    y: ref.current?.scrollTop - parentBBox.top
                }

                for (let i = 0; i < mappedLinks.length; i++) {
                    const {
                        target,
                        source,
                        linkPath,
                        supplementary
                    } = mappedLinks[i]

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
                        if (supplementary.getAttribute("d") !== curve)
                            supplementary.setAttribute("d", curve)
                        if (linkPath.getAttribute("d") !== curve)
                            linkPath.setAttribute("d", curve)
                    }
                }

            } catch (error) {
            }
        }

        callback()
        const mt = new MutationObserver(callback)

        mt.observe(ref.current, {subtree: true, childList: true, attributes: true})

        return () => {
            mt.disconnect()
        }
    }, [links, scale])

    return {

        links,
        ref,
        handleLink
    }
}