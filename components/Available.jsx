import {useRef, useState} from "react";
import styles from '../styles/Available.module.css'
import {Accordion,ToolTip, AccordionSummary, Button} from "@f-ui/core";
import {materialAvailable} from "../templates/MaterialAvailable";
import {basicAvailable} from "../templates/BasicAvailable";


export default function Available() {
    const [hidden, setHidden] = useState(true)
    const ref = useRef()
    const workflowData = [
        {
            data: materialAvailable,
            label: 'Material',
            icon: <span style={{fontSize: '1.1rem'}} className={'material-icons-round'}>public</span>
        },
        {
            data: basicAvailable,
            label: 'Operations',
            icon: <span style={{fontSize: '1.1rem'}} className={'material-icons-round'}>calculate</span>
        },

    ]
    return (
        <div ref={ref} className={styles.wrapper} style={{width: hidden ? '35px' : undefined}}>
            <Button
                variant={'minimal-horizontal'}
                onClick={() => {
                    ref.current.previousSibling.style.width = '100%'
                    setHidden(!hidden)
                }}
                className={styles.button}
                styles={{
                    flexDirection: hidden ? 'column' : undefined,
                    justifyContent: hidden ? 'center' : 'flex-start',

                }}>
                <div className={'material-icons-round'}
                     style={{transform: hidden ? 'rotate(180deg)' : undefined}}>chevron_right
                </div>
                <div style={{
                    textOrientation: hidden ? 'mixed' : undefined,
                    writingMode: hidden ? 'vertical-rl' : undefined,
                    transform: hidden ? 'rotate(180deg)' : undefined
                }}>
                    Available nodes
                </div>
            </Button>

            <div className={styles.content}>
                {hidden ? null : workflowData.map(data => (
                    <Accordion>
                        <AccordionSummary
                            className={styles.summary}
                            styles={{fontSize: '.9rem'}}>
                            {data.icon}
                            {data.label}
                        </AccordionSummary>
                        {data.data.map((d) => (
                            <div
                                className={styles.option}
                                draggable={true}
                                onDragStart={e => e.dataTransfer.setData('text', d.dataTransfer)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                {d.label}
                                <ToolTip content={d.tooltip} align={'middle'} justify={'start'}/>
                            </div>
                        ))}
                    </Accordion>
                ))}
            </div>
        </div>
    )
}
