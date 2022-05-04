import styles from '../styles/Compilation.module.css'
import PropTypes from "prop-types";
import {Tab, Tabs} from "@f-ui/core";
import {useState} from "react";
import AccordionTemplate from "../../../../components/accordion/AccordionTemplate";
import React from 'react'

export default function CompilationStatus(props) {
    const {status} = props
    const [open, setOpen] = useState(0)
    return (
        <div className={styles.wrapper}>
            <Tabs open={open} setOpen={setOpen} styles={{padding: '4px'}}>
                <Tab label={'Information'} className={styles.content}>
                    {status.info && status.info.length > 0 ? status.info.map((s, i) => (
                            <React.Fragment key={'line-status-data' + i}>
                                <AccordionTemplate title={s?.label}>
                                    {s.data}
                                </AccordionTemplate>
                            </React.Fragment>
                        ))
                        :
                        <div className={styles.empty}>
                            <span style={{fontSize: '90px'}} className={'material-icons-round'}>code</span>
                            Please compile the shader.
                        </div>
                    }
                </Tab>
                <Tab label={'Errors'} className={styles.content}>
                    {status.messages && status.messages.length > 0 ? status.messages.map(s => (
                            <AccordionTemplate title={s?.label}>
                                {s.lines.map((l, i) => (
                                    <React.Fragment key={'line-status-' + i}>
                                        <div className={styles.row} style={{whiteSpace: 'nowrap', overflowX: 'auto'}}>
                                            {l}
                                        </div>
                                        <div className={styles.row} style={{background: 'unset'}}>
                                            {s.error}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </AccordionTemplate>
                        )) :
                        <div className={styles.empty}>
                            <span style={{fontSize: '90px'}}
                                  className={'material-icons-round'}>{status.messages ? 'check' : "code"}</span>
                            {!status.messages ? "Please compile the shader." : "No errors were found."}
                        </div>
                    }
                </Tab>
            </Tabs>
        </div>
    )
}

CompilationStatus.propTypes = {
    status: PropTypes.shape({
        info: PropTypes.array,
        error: PropTypes.number,
        messages: PropTypes.array,
        hasError: PropTypes.bool
    })
}