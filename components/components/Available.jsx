import styles from "../styles/Available.module.css"

import Search from "../../../../../components/search/Search"
import React, {useMemo, useState} from "react"
import PropTypes from "prop-types"

export default function Available(props) {
    const [searchString, setSearchString] = useState("")
    const nodes = useMemo(() => {
        return props.allNodes.filter(i => {
            if (typeof i.label === "object")
                return i.label.props.children.includes(searchString)
            else
                return i.label.includes(searchString)
        })
    }, [searchString])

    return (
        <div className={styles.wrapper} style={props.styles}>
            <div className={styles.header} style={{justifyItems: "flex-start"}}>
                Available nodes
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
                            <span className={"material-icons-round"}>drag_indicator</span>
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