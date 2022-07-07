import PropTypes from "prop-types"
import React from "react"
import Range from "../../../../components/range/Range"
import styles from "../styles/NodeEditor.module.css"

export default function BoardSettings(props){
    const {grid, setGrid, scale, setScale} = props
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                <Range integer={true} label={"Grid size (px)"} onFinish={setGrid} value={grid}/>
                <Range label={"Zoom"} value={scale} precision={3} incrementPercentage={.01} onFinish={setScale} minValue={.25} maxValue={2.5}/>
            </div>
        </div>
    )
}
BoardSettings.propTypes={
    grid: PropTypes.number, 
    setGrid: PropTypes.func, 
    scale: PropTypes.number,
    setScale: PropTypes.func
}