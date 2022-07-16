import shared from "../styles/Attribute.module.css"
import styles from "../styles/Compilation.module.css"
import PropTypes from "prop-types"
import {Icon, Tab, Tabs} from "@f-ui/core"
import React, {useState} from "react"
import AccordionTemplate from "../../../../components/accordion/AccordionTemplate"

export default function CompilationStatus(props) {
    const {status} = props
    const [open, setOpen] = useState(0)
    return (
        <div className={shared.contentWrapper}>
            <div className={shared.wrapper}>
                <Tabs open={open} setOpen={setOpen} styles={{padding: "4px"}}>
                    <Tab label={"Information"} className={styles.content}>
                        {status.info && status.info.length > 0 ? status.info.map((s, i) => (
                            <React.Fragment key={"line-status-data" + i}>
                                <AccordionTemplate title={s?.label}>
                                    {s.data}
                                </AccordionTemplate>
                            </React.Fragment>
                        ))
                            :
                            <div className={styles.empty}>
                                <Icon styles={{fontSize: "90px"}} >code</Icon>
                            Please compile the shader.
                            </div>
                        }
                    </Tab>
                    <Tab label={"Errors"} className={styles.content}>
                        {status.messages && status.messages.length > 0 ? status.messages.map((s, i) => (
                            <React.Fragment key={"status-" + s.label + i}>
                                <AccordionTemplate title={s?.label}>
                                    {s.lines.map((l, i) => (
                                        <React.Fragment key={"line-status-" + i}>
                                            <div className={styles.row} style={{whiteSpace: "nowrap", overflowX: "auto"}}>
                                                {l}
                                            </div>
                                            <div className={styles.row} style={{background: "unset"}}>
                                                {s.error}
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </AccordionTemplate>
                            </React.Fragment>
                        )) :
                            <div className={styles.empty}>
                                <Icon styles={{fontSize: "90px"}}
                                >{status.messages ? "check" : "code"}</Icon>
                                {!status.messages ? "Please compile the shader." : "No errors were found."}
                            </div>
                        }
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

CompilationStatus.propTypes = {
    status: PropTypes.object
}