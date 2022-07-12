import PropTypes from "prop-types"
import React, {useState} from "react"
import Range from "../../../../components/range/Range"
import styles from "../styles/NodeEditor.module.css"

export default function BoardSettings(){
    const [grid, setGrid] = useState(1)
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                <Range integer={true} label={"Grid size (px)"} onFinish={v => {
                    setGrid(v)
                    window.blueprints.grid = v
                }} value={grid}/>
            </div>
        </div>
    )
}
BoardSettings.propTypes={
    grid: PropTypes.number, 
    setGrid: PropTypes.func
}