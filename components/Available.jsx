import styles from "../styles/Available.module.css"

import Search from "../../../../components/search/Search"
import React, {useDeferredValue, useMemo, useState} from "react"
import PropTypes from "prop-types"
import {Icon} from "@f-ui/core"

const parseStr = (str) => {
    return str.toLowerCase().replace(/\s/g,"")
}
export default function Available(props) {
    const [searchString, setSearchString] = useState("")
    const search = useDeferredValue(searchString)
    const nodes = useMemo(() => {
        const s = parseStr(search)
        if(!s)
            return props.allNodes
        return props.allNodes.filter(i => parseStr(i.label).includes(s))
    }, [search])

    return (
        <div className={styles.wrapper} style={props.styles}>
            <div className={styles.header} style={{justifyItems: "flex-start"}}>
                Nodes
                <Search
                    width={"100%"}
                    noPadding={true}
                    height={"20px"}
                    searchString={searchString}
                    setSearchString={setSearchString}
                />
            </div>
            <div className={styles.content}>
                {nodes.map((d, i) => (
                    <div
                        className={styles.option}
                        draggable={true}
                        title={d.tooltip}
                        style={{background: i % 2 === 0 ? "var(--pj-background-secondary)" : undefined}}
                        onDragStart={e => e.dataTransfer.setData("text", d.dataTransfer)}
                        key={d.dataTransfer + "-" + i}
                    >
                        <div className={styles.icon}>
                            <Icon >drag_indicator</Icon>
                        </div>
                        {d.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

Available.propTypes = {
    allNodes: PropTypes.array,
    styles: PropTypes.object
}