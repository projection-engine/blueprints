import styles from '../styles/Compilation.module.css'
import PropTypes from "prop-types";
import {Tab, Tabs} from "@f-ui/core";
import {useState} from "react";

export default function CompilationStatus(props){
    const {status} = props
    const [open, setOpen] = useState(0)
    return (
        <div className={styles.wrapper}>
            <Tabs open={open} setOpen={setOpen} styles={{padding: '4px'}}>
                <Tab label={'Information'} className={styles.content}>
                    {status.info?.map(s => (
                        <div className={styles.row}>
                            {s?.label}
                        </div>
                    ))}
                </Tab>
                <Tab label={'Errors'} className={styles.content}>
                    {status.messages?.map(s => (
                        <div className={styles.row}>
                            {s.label}
                            {s.lines.map(l => (
                                l
                            ))}
                        </div>
                    ))}
                </Tab>
            </Tabs>
        </div>
    )
}

CompilationStatus.propTypes={
    status: PropTypes.shape({
        info: PropTypes.array,
        error: PropTypes.number,
        messages: PropTypes.array,
        hasError: PropTypes.bool
    })
}