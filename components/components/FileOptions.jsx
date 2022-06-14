import styles from "../styles/FileOptions.module.css"
import PropTypes from "prop-types"
import {Button, Icon} from "@f-ui/core"
import React from "react"

export default function FileOptions(props){
    return (
        <div className={styles.wrapper}>
            {props.options.map((o, i) => (
                <React.Fragment key={"file-options-"+i}>
                    {o.divider ? <div className={styles.divider}/>:
                        <Button onClick={o.onClick} disabled={o.disabled} className={styles.button} attributes={{title: o.label}}>
                            <Icon   styles={{fontSize: "1.2rem"}}>{o.icon}</Icon>
                        </Button>
                    }
                </React.Fragment>
            ))}
        </div>
    )
}

FileOptions.propTypes={
    options: PropTypes.array
}