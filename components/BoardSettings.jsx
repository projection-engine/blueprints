import PropTypes from "prop-types"
import React from "react"
import Range from "../../../../components/range/Range"
import styles from "../styles/NodeEditor.module.css"

export default function BoardSettings(props){
    const {grid, setGrid} = props
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                <Range integer={true} label={"Grid size (px)"} onFinish={setGrid} value={grid}/>
            </div>
        </div>
    )
}
BoardSettings.propTypes={
    grid: PropTypes.number, 
    setGrid: PropTypes.func
}