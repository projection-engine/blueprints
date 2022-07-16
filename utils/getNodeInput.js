import {DATA_TYPES} from "../../../engine/templates/DATA_TYPES"
import Range from "../../../../components/range/Range"
import Material from "../templates/nodes/Material"
import styles from "../styles/NodeEditor.module.css"
import ColorPicker from "../../../../components/color/ColorPicker"
import Selector from "../../../../components/selector/Selector"
import {Checkbox, Dropdown, DropdownOption, DropdownOptions, Icon} from "@f-ui/core"
import React from "react"
const getNewVec = (value, v, index, type) => {
    switch (type) {
    case  DATA_TYPES.VEC2:
        return [index === 0 ? v : value[0], index === 1 ? v : value[1]]
    case  DATA_TYPES.VEC3:
        return [
            index === 0 ? v : value[0],
            index === 1 ? v : value[1],
            index === 2 ? v : value[2]
        ]
    case  DATA_TYPES.VEC4:
        return [
            index === 0 ? v : value[0],
            index === 1 ? v : value[1],
            index === 2 ? v : value[2],
            index === 3 ? v : value[3]
        ]
    default:
        return value
    }
}

export default function getNodeInput(attribute, node, handleChange){
    const value = node[attribute.key]
    const label = attribute.label, type = attribute.type
    switch (type) {
    case DATA_TYPES.INT:
    case DATA_TYPES.FLOAT:
        return (
            <Range
                precision={3}
                integer={type === DATA_TYPES.INT}
                maxValue={attribute.max}
                incrementPercentage={.001}
                minValue={attribute.min}
                value={value}
                onFinish={v => handleChange(type === DATA_TYPES.FLOAT ? v : parseInt(v), attribute)}
                label={label}
            />
        )
    case DATA_TYPES.VEC4:
    case DATA_TYPES.VEC3:
    case DATA_TYPES.VEC2:
        return (
            <div className={styles.vecWrapper}>
                <Range
                    maxValue={attribute.max}
                    minValue={attribute.min}
                    value={value[0]}
                    label={label}
                    onFinish={v => handleChange(getNewVec(value, v, 0, type), attribute)}
                />
                <Range
                    maxValue={attribute.max}
                    minValue={attribute.min}
                    value={value[1]}
                    label={label}
                    onFinish={v => handleChange(getNewVec(value, v, 1, type), attribute)}
                />
                {type === DATA_TYPES.VEC4 || type === DATA_TYPES.VEC3 ? (
                    <Range
                        maxValue={attribute.max}
                        minValue={attribute.min}
                        value={value[2]}
                        label={label}
                        onFinish={v => handleChange(getNewVec(value, v, 2, type), attribute)}
                    />
                ) : null}
                {type === DATA_TYPES.VEC4 ? (
                    <Range
                        maxValue={attribute.max}
                        minValue={attribute.min}
                        onFinish={v => handleChange([value[0], value[1], value[2], v], attribute)}
                        value={value ? value[3] : undefined}
                        label={label}
                    />
                ) : null}
            </div>
        )
    case DATA_TYPES.COLOR:
        return <ColorPicker
            submit={c => handleChange(c, attribute)}
            value={value}
        />
    case DATA_TYPES.TEXTURE:
        return (
            <Selector
                type={"image"}
                handleChange={(src) => handleChange(src,  attribute)}
                selected={value}
            />
        )

    case DATA_TYPES.OPTIONS:
        return (
            <Dropdown styles={{width: "100%", justifyContent: "space-between"}}>
                {attribute.options.find(o => o.data === value)?.label}
                <DropdownOptions>
                    {attribute.options?.map((o, i) => (
                        <React.Fragment key={"header-" + i}>
                            <DropdownOption option={{
                                ...o,
                                icon: o.data === value ? <Icon styles={{fontSize: "1.1rem"}}
                                >check</Icon> : null,
                                onClick: () => handleChange(o.data, attribute)
                            }}/>
                        </React.Fragment>
                    ))}
                </DropdownOptions>
            </Dropdown>
        )
    case DATA_TYPES.CHECKBOX:
        return (
            <Checkbox
                label={attribute.label}
                disabled={attribute.disabled}
                width={"100%"}
                checked={value}
                handleCheck={() => handleChange(!value, attribute)}
                height={"25px"}
                noMargin={true}
            />
        )
    default:
        return
    }
}

