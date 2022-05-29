import React, {useMemo} from "react";
import styles from '../styles/Structure.module.css'
import PropTypes from "prop-types";

import {Button, ContextMenu, Ripple,} from "@f-ui/core";
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import deleteNode from "../../components/utils/deleteNode";
import NODE_TYPES from "../../components/NODE_TYPES";

import {v4 as uuidv4} from 'uuid';
import AccordionTemplate from "../../../../../components/templates/AccordionTemplate";

export default function Structure(props) {
    const {
        selectedVariable, setSelectedVariable
    } = props

    const events = useMemo(() => {
        return props.hook.nodes.filter(n => n.type === NODE_TYPES.START_POINT)
    }, [props.hook.nodes])

    const getName = (prev) => {
        let n = 'New Variable'
        let it = 0

        while (prev.filter(e => e.name === n).length > 0) {
            it++
            n = 'New Variable' + `(${it})`
        }

        return n
    }


    const getType = (t) => {
        switch (t) {
            case DATA_TYPES.VEC2:
                return 'Vector 2D'
            case DATA_TYPES.VEC3:
                return 'Vector 3D'
            case DATA_TYPES.VEC4:
                return 'Vector 4D'
            case DATA_TYPES.NUMBER:
                return 'Number'
            case DATA_TYPES.BOOL:
                return 'Boolean'
            default:
                break
        }
    }


    return (
        <div className={styles.wrapper} style={{width: '275px'}}>

            <AccordionTemplate title={'Events'}>
                {events.map(g => (
                    <div className={styles.option} onDoubleClick={() => {
                        props.focusNode(g.id)
                    }}>
                         <span className={'material-icons-round'}
                               style={{fontSize: '1.1rem'}}>output</span>
                        {g.name}
                        <Ripple accentColor={'var(--fabric-accent-color)'} opacity={'.1'}/>
                    </div>
                ))}
            </AccordionTemplate>
            <AccordionTemplate title={'Variables'}>
                <ContextMenu
                    options={[{
                        requiredTrigger: 'data-var',
                        onClick: (n) => {
                            setSelectedVariable(undefined)
                            const allN = props.hook.nodes.filter(nn => nn.id.includes(n.getAttribute('data-var')))
                            allN.forEach(nn => {
                                deleteNode(nn.id, props.hook, () => null)
                            })
                            props.hook.setVariables(p => {
                                return p.filter(pp => pp.id !== n.getAttribute('data-var'))
                            })
                        },
                        label: 'Delete variable',
                        icon: <span className={'material-icons-round'}
                                    style={{fontSize: '1.1rem'}}>delete_forever</span>
                    }]}
                    triggers={['data-var']}
                >
                    <Button
                        className={styles.option}
                        styles={{borderRadius: 0}}
                        variant={'filled'}

                        onClick={() => {
                            props.hook.setVariables(prev => {
                                return [...prev, {
                                    id: uuidv4(),
                                    name: getName(prev),
                                    type: DATA_TYPES.NUMBER
                                }]
                            })
                        }}>

                        <span className={'material-icons-round'} style={{fontSize: '1.1rem'}}>add</span>
                        Add new variable
                    </Button>
                    {props.hook.variables.map(g => (
                        <div
                            data-highlight={`${selectedVariable === g.id}`}
                            className={styles.option}
                            draggable={true}
                            onDragStart={e => e.dataTransfer.setData('text', JSON.stringify({
                                key: g.id,
                                type: 'getter'
                            }))}
                            onClick={() => {
                                props.hook.setSelected([])
                                setSelectedVariable(g.id)
                            }}
                            data-var={g.id}>
                            <div>
                                {g.name}
                            </div>

                            <div style={{fontWeight: '500', fontSize: '.65rem'}}>
                                {getType(g.type)}
                            </div>

                        </div>
                    ))}
                </ContextMenu>
            </AccordionTemplate>
        </div>
    )
}

Structure.propTypes = {
    openTab: PropTypes.number,
    focusNode: PropTypes.func,
    selectedVariable: PropTypes.string,
    setSelectedVariable: PropTypes.func,

    hook: PropTypes.object,
    engine: PropTypes.object,
    isLevelBlueprint: PropTypes.bool
}