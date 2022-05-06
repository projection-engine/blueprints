import React, {useMemo} from "react";
import styles from '../styles/Structure.module.css'
import PropTypes from "prop-types";

import {Button, ContextMenu, Ripple,} from "@f-ui/core";
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import deleteNode from "../../components/utils/deleteNode";
import NODE_TYPES from "../../components/NODE_TYPES";
import mapToView from "../../../scene/utils/mapToView";
import {ENTITY_ACTIONS} from "../../../../engine/useEngineEssentials";
import TreeView from "../../../../../components/tree/TreeView";

import {v4 as uuidv4} from 'uuid';
import AccordionTemplate from "../../../../../components/accordion/AccordionTemplate";

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

    const data = useMemo(() => {
        let toFilter = props.engine.entities.filter(d => !d.linkedTo && !d.components.Grid)
        return [{
            id: 0,
            label: 'Blueprint',
            children: toFilter.map(f => {
                return mapToView(f, props.engine.entities, (el, e) => {
                    if (e && e.ctrlKey) {
                        props.engine.setSelected(prev => {
                            const indexFound = prev.findIndex(f => f === el)
                            if (indexFound === -1)
                                return [...prev, el]
                            else {
                                let n = [...prev]
                                n.splice(indexFound, 1)
                                return n
                            }
                        })
                    } else
                        props.engine.setSelected([el])
                }, props.engine)
            }),
            icon: <span className={'material-icons-round'} style={{fontSize: '1rem'}}>inventory_2</span>,
            type: 'Scene',
            phantomNode: true
        }]
    }, [props.engine.entities])


    return (
        <div className={styles.wrapper} style={{width: '275px'}}>
            <TreeView
                contextTriggers={[
                    'data-node',
                    'data-self'
                ]}
                draggable={props.openTab === 1 || props.isLevelBlueprint}
                searchable={true}
                options={[
                    {
                        requiredTrigger: 'data-node',
                        label: 'Remove entity',
                        icon: <span className={'material-icons-round'}>delete</span>,
                        onClick: (node) => {
                            const toDelete = [...props.engine.selected, node.getAttribute('data-node')]
                            props.engine.setSelected([])
                            props.engine.dispatchEntities({
                                type: ENTITY_ACTIONS.REMOVE_BLOCK,
                                payload: toDelete
                            })

                        }
                    }
                ]}
                selected={props.engine.selected}
                nodes={data}
                styles={{maxHeight: '50%'}}
                handleRename={(treeNode, newName) => {
                    props.engine.dispatchEntities({
                        type: ENTITY_ACTIONS.UPDATE,
                        payload: {entityID: treeNode.id, key: 'name', data: newName}
                    })
                }}
            />
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