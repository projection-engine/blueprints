import React, {useMemo} from "react"
import styles from "../styles/NodeEditor.module.css"
import PropTypes from "prop-types"
import Material from "../templates/nodes/Material"

import {Checkbox, Dropdown, DropdownOption, DropdownOptions, Icon, TextField} from "@f-ui/core"
import Range from "../../../../components/range/Range"
import Selector from "../../../../components/selector/Selector"

import ColorPicker from "../../../../components/color/ColorPicker"

import cloneClass from "../../../engine/utils/cloneClass"
import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import AccordionTemplate from "../../../../components/accordion/AccordionTemplate"
import Float from "../templates/nodes/math/Float"
import getNodeInput from "../utils/getNodeInput"

export default function AttributeEditor(props) {
    const selected = useMemo(() => {
        const index = props.hook.nodes.findIndex(n => (props.selected ? n.id === props.selected : n instanceof Material))
        if (index > -1)
            return props.hook.nodes[index]
        return undefined
    },
    [props.hook.selected, props.selected, props.hook.nodes]
    )

    function submitNodeVariable(event, attr) {
        props.hook.setNodes(prev => {
            const n = [...prev]
            const classLocation = n.findIndex(e => e.id === selected.id)
            const clone = cloneClass(prev[classLocation])
            clone[attr.key] = event
            const input = clone.inputs.find(i => i.key === attr.key)

            if (input.onChange)
                input.onChange(event)

            n[classLocation] = clone
            return n
        })
        props.hook.setChanged(true)
        props.hook.setImpactingChange(true)
    }


    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                {selected instanceof Float ?
                    <TextField
                        value={selected.name} width={"100%"}
                        height={"35px"}
                        handleChange={ev => {
                            props.hook.setNodes(prev => {
                                const n = [...prev],
                                    classLocation = n.findIndex(e => e.id === selected.id),
                                    clone = cloneClass(prev[classLocation])

                                clone.name = ev
                                n[classLocation] = clone
                                return n
                            })
                        }}
                        label={"Name"}
                        placeholder={"Name"}/>
                    : null}
                {selected.inputs
                    .map((attr, i) => !attr.accept ? (
                        <React.Fragment key={attr.label + "-attribute-" + i}>
                            {getNodeInput(attr, selected, submitNodeVariable)}
                        </React.Fragment>
                    ) : null)}
            </div>
        </div>
    )
}

AttributeEditor.propTypes = {
    selected: PropTypes.string,
    hook: PropTypes.object
}