import React, {useMemo, useState} from "react"
import styles from "../styles/Structure.module.css"
import PropTypes from "prop-types"

import {Button, Tab, Tabs,} from "@f-ui/core"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import deleteNode from "../../components/utils/deleteNode"
import NODE_TYPES from "../../components/templates/NODE_TYPES"
import shared from "../../components/styles/Board.module.css"
import {v4 as uuidv4} from "uuid"
import useContextTarget from "../../../../../components/context/hooks/useContextTarget"

const TRIGGERS = ["data-var"]
export default function Structure(props) {
    const {
        selectedVariable, setSelectedVariable
    } = props
    const [openTab, setOpenTab] = useState(0)
    const events = useMemo(() => {
        return props.hook.nodes.filter(n => n.type === NODE_TYPES.START_POINT)
    }, [props.hook.nodes])

    const getName = (prev) => {
        let n = "New Variable"
        let it = 0

        while (prev.filter(e => e.name === n).length > 0) {
            it++
            n = "New Variable" + `(${it})`
        }

        return n
    }
    
    const getType = (t) => {
        switch (t) {
        case DATA_TYPES.VEC2:
            return "Vector 2D"
        case DATA_TYPES.VEC3:
            return "Vector 3D"
        case DATA_TYPES.VEC4:
            return "Vector 4D"
        case DATA_TYPES.NUMBER:
            return "Number"
        case DATA_TYPES.BOOL:
            return "Boolean"
        default:
            break
        }
    }
    const options = useMemo(() => {
        return [{
            requiredTrigger: "data-var",
            onClick: (n) => {
                setSelectedVariable(undefined)
                const allN = props.hook.nodes.filter(nn => nn.id.includes(n.getAttribute("data-var")))
                allN.forEach(nn => {
                    deleteNode(nn.id, props.hook, () => null)
                })
                props.hook.setVariables(p => {
                    return p.filter(pp => pp.id !== n.getAttribute("data-var"))
                })
            },
            label: "Delete variable",
            icon:"delete_forever"
        }]
    }, [props.hook.variables, props.hook.nodes])

    useContextTarget(
        {id:props.id + "-context"},
        options,
        TRIGGERS
    )
    return (

        <Tabs open={openTab} setOpen={setOpenTab} className={shared.content} styles={{borderRadius: "0 5px 5px 0", minWidth: "200px"}}>
            <Tab label={"Event triggers"} className={styles.variables}>
                {events.length > 0 ? events.map(g => (
                    <div
                        key={"event-blueprint-"+g.id}
                        className={styles.option}
                        onDoubleClick={() => {
                            props.focusNode(g.id)
                        }}>
                        <span className={"material-icons-round"}
                            style={{fontSize: "1.1rem"}}>output</span>
                        {g.name}
                    </div>
                )) :  <Empty label={"event triggers"}/>}
            </Tab>
            <Tab label={"Variables"} className={styles.variables}>
                <div id={props.id + "-context"} style={{height: "100%"}}>
                    <Button
                        className={styles.option}
                        variant={"filled"}

                        onClick={() => {
                            props.hook.setVariables(prev => {
                                return [...prev, {
                                    id: uuidv4(),
                                    name: getName(prev),
                                    type: DATA_TYPES.NUMBER
                                }]
                            })
                        }}>

                        <span className={"material-icons-round"} style={{fontSize: "1.1rem"}}>add</span>
                            Add new variable
                    </Button>
                    {props.hook.variables.length > 0 ? props.hook.variables.map(g => (
                        <div
                            key={"variable-blueprint-"+g.id}
                            data-highlight={`${selectedVariable === g.id}`}
                            className={styles.option}
                            draggable={true}
                            onDragStart={e => e.dataTransfer.setData("text", JSON.stringify({
                                key: g.id,
                                type: "getter"
                            }))}
                            onClick={() => {
                                props.setOpenTab(0)
                                props.hook.setSelected([])
                                setSelectedVariable(g.id)
                            }}
                            data-var={g.id}>
                            <div>
                                {g.name}
                            </div>

                            <label style={{fontWeight: "500", fontSize: ".65rem"}}>
                                {getType(g.type)}
                            </label>
                        </div>
                    )) :  <Empty label={"variables"}/>}
                </div>
            </Tab>
        </Tabs>

    
    )
}

Structure.propTypes = {
    id: PropTypes.string,
    openTab: PropTypes.number,
    focusNode: PropTypes.func,
    selectedVariable: PropTypes.string,
    setSelectedVariable: PropTypes.func,
    setOpenTab: PropTypes.func,
    hook: PropTypes.object,
    engine: PropTypes.object
}

function Empty ({label}){
    return (
        <div className={styles.empty}>
            <span className={"material-icons-round"} style={{fontSize: "50px"}}>folder</span>
            No {label} found.
        </div>
    )
}
Empty.propTypes={
    label: PropTypes.string
}