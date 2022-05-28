import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import Range from "../../../../../components/range/Range";
import styles from "../styles/NodeEditor.module.css";
import {Checkbox, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";
import React from "react";

export default function getInput(label, type, value, submit, obj, hook, selected){
    switch (type) {
        case DATA_TYPES.NUMBER:
            return (
                <Range
                    accentColor={'red'}
                    precision={3}
                    maxValue={obj.max}
                    incrementPercentage={.01}
                    minValue={obj.min}
                    value={value !== undefined ? value : 0}
                    handleChange={submit} label={label}/>
            )
        case DATA_TYPES.VEC2:
        case DATA_TYPES.VEC3:
        case DATA_TYPES.VEC4:
            return (
                <div className={styles.vecWrapper}>
                    <Range
                        accentColor={'red'}
                        precision={3}
                        maxValue={obj.max}
                        incrementPercentage={.01}
                        minValue={obj.min}
                        value={value ? value[0] : undefined}
                        handleChange={v => {
                            const c = [...value]
                            c[0] = parseFloat(v)
                            submit(c)
                        }}
                        label={label}/>
                    <Range accentColor={'green'}
                           precision={3}
                           maxValue={obj.max}
                           incrementPercentage={.01}
                           minValue={obj.min}
                           value={value ? value[1] : undefined}
                           handleChange={v => {
                               const c = [...value]
                               c[1] = parseFloat(v)
                               submit(c)
                           }}
                           label={label}/>
                    {type === DATA_TYPES.VEC3 || type === DATA_TYPES.VEC4 ?
                        <Range
                            accentColor={'blue'}
                            precision={3}
                            maxValue={obj.max}
                            incrementPercentage={.01}
                            minValue={obj.min}
                            value={value ? value[2] : undefined}
                            handleChange={v => {
                                const c = [...value]
                                c[2] = parseFloat(v)
                                submit(c)
                            }}
                            label={label}/>
                        : null}
                    {type === DATA_TYPES.VEC4 ?
                        <Range
                            accentColor={'yellow'}
                            precision={3}
                            maxValue={obj.max}
                            incrementPercentage={.01}
                            minValue={obj.min}
                            value={value ? value[3] : undefined}
                            handleChange={v => {
                                const c = [...value]
                                c[3] = parseFloat(v)
                                submit(c)
                            }}
                            label={label}/>
                        : null}
                </div>
            )

        case DATA_TYPES.BOOL:
            return <Checkbox width={'100%'} noMargin={true} label={label} checked={value} handleCheck={() => submit(!value)}/>
        case DATA_TYPES.OPTIONS:
            return (
                <Dropdown styles={{width: '100%', justifyContent: 'space-between'}}>
                    {obj.options.find(o => o.data === hook.variables[selected][obj.key])?.label}
                    <DropdownOptions>
                        {obj.options?.map((o, i) => (
                            <React.Fragment key={'options-' + i}>
                                <DropdownOption option={{
                                    ...o,
                                    icon: o.data === hook.variables[selected][obj.key] ?
                                        <span style={{fontSize: '1.1rem'}}
                                              className={'material-icons-round'}>check</span> : null,
                                    onClick: () => {
                                        submit(o.data)
                                    }
                                }}/>
                            </React.Fragment>
                        ))}
                    </DropdownOptions>
                </Dropdown>
            )
        default:
            return
    }
}