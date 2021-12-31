import {useState} from "react";
import styles from '../styles/Available.module.css'
import {Accordion, AccordionSummary, Button} from "@f-ui/core";
import Types from "../constants/Types";

export default function Available() {
    const [hidden, setHidden] = useState(false)
    return (
        <div className={styles.wrapper} style={{width: hidden ? '35px' : undefined}}>
            <Button onClick={() => setHidden(!hidden)} className={styles.button}
                    styles={{justifyContent: hidden ? 'center' : 'flex-start'}}>
                <div className={'material-icons-round'}
                     style={{transform: hidden ? 'rotate(180deg)' : undefined}}>chevron_right
                </div>
                {hidden ? null : 'Available nodes'}
            </Button>

            <div className={styles.content}>
                {hidden ? null :
                    <>
                        <Accordion>
                            <AccordionSummary
                                styles={{fontSize: '.9rem'}}>
                                Misc
                            </AccordionSummary>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.CONSTANT)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Constant
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.BASIC_MAT)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Basic Material
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.PBR)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                PBR Material
                            </div>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                styles={{fontSize: '.9rem'}}>
                                Functions
                            </AccordionSummary>

                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.ADD)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Addition
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.SUB)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Subtraction
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.MULT)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>

                                Multiplication
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.DIV)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Division
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.POW)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Power
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_ADD)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector addition
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_SUB)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector subtraction
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_SCALAR)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector by scalar
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.CROSS_P)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Cross product
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.DOT_P)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Dot product
                            </div>

                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                styles={{fontSize: '.9rem'}}>
                                Objects
                            </AccordionSummary>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.ARRAY)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Array
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.RGB)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                RGB
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.RGBA)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                RGBA
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_2D)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector 2D
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_3D)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector 3D
                            </div>
                            <div className={styles.option} draggable={true}
                                 onDragStart={e => e.dataTransfer.setData('text', Types.VEC_4D)}>
                                <div className={'material-icons-round'}
                                     style={{fontSize: '1.1rem'}}>drag_indicator
                                </div>
                                Vector 4D
                            </div>
                        </Accordion>
                    </>
                }
            </div>
        </div>
    )
}