import React, {useContext, useMemo} from "react"
import styles from "../styles/Attribute.module.css"
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
import UpdateNodeProvider from "../context/UpdateNodeProvider"

export default function AttributeEditor(props) {
    const selected = useMemo(() => {
        const index = props.hook.nodes.findIndex(n => (props.selected ? n.id === props.selected : n instanceof Material))
        return props.hook.nodes[index]
    }, [props.hook.selected, props.selected, props.hook.nodes])

    const {updateNode, submitNodeVariable} = useContext(UpdateNodeProvider)
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.wrapper}>
                <TextField
                    value={selected.name} width={"100%"}
                    height={"30px"}
                    handleChange={ev => updateNode("name", ev, selected)}
                    label={"Name"}
                    placeholder={"Name"}
                />

                {selected.inputs
                    .map((attr, i) => !attr.accept ? (
                        <React.Fragment key={attr.label + "-attribute-" + i}>
                            {getNodeInput(attr, selected, (...attrData) => submitNodeVariable(...attrData, selected))}
                        </React.Fragment>
                    ) : null)}
                {selected.isComment ? (
                    <>
                        <label>Color</label>
                        <ColorPicker
                            submit={(_, arr) => {
                                updateNode("color", [...arr, .5], selected)
                            }}
                            value={selected.color}
                            size={"small"}
                        />
                    </>
                ) : null}
            </div>
        </div>
    )
}

AttributeEditor.propTypes = {
    selected: PropTypes.string,
    hook: PropTypes.object
}