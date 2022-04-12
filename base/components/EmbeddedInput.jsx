import React, {useMemo, useState} from "react";
import {TYPES} from "../TYPES";
import Range from "../../../../components/range/Range";
import {Dropdown, DropdownOption, DropdownOptions, TextField} from "@f-ui/core";
import styles from "../styles/Node.module.css";
import Search from "../../../../components/search/Search";
import PropTypes from "prop-types";

export default function EmbeddedInput(props) {
    const [bundledVariable, setBundledVariable] = useState(props.type === 'input' ? props.node[props.data.key] : undefined)
    const [searchString, setSearchString] = useState('')
    return useMemo(() => {
        if (props.canRender)
            switch (props.data.type) {
                case TYPES.NUMBER:
                    return (
                        <Range
                            {...props.data}
                            styles={{width: '50px', height: '20px', borderRadius: '3px'}}
                            value={bundledVariable}
                            handleChange={v => setBundledVariable(v)}
                            onFinish={() => props.submit(bundledVariable)}
                        />
                    )
                case TYPES.STRING:
                    return (
                        <TextField
                            value={bundledVariable}
                            placeholder={props.data.label}
                            handleChange={v => setBundledVariable(v.target.value)}
                            height={'15px'}
                            width={' 50px'}
                            onEnter={() => props.submit(bundledVariable)}
                            onBlur={() => props.submit(bundledVariable)}
                        />
                    )
                case TYPES.OPTIONS:
                    return (
                        <Dropdown
                            className={styles.bundled}
                            hideArrow={true}
                            wrapperClassname={styles.wrapperContent}
                            variant={bundledVariable !== undefined ? 'filled' : "outlined"}
                            attributes={{title: bundledVariable ? bundledVariable : props.data.label}}>
                            {bundledVariable ? bundledVariable : props.data.label}
                            <DropdownOptions>
                                <div className={styles.header}>
                                    <Search width={'100%'}
                                            setSearchString={v => setSearchString(v.toLowerCase())}
                                            searchString={searchString}/>
                                    <DropdownOption
                                        option={{
                                            label: 'Clear selected',
                                            icon: <span className={'material-icons-round'}
                                                        style={{fontSize: '1.1rem'}}>clear</span>,
                                            onClick: () => {
                                                props.submit(undefined)
                                                setBundledVariable(undefined)
                                            }
                                        }}
                                    />
                                </div>
                                {props.data.options.map((o, i) => o.label.toLowerCase().includes(searchString) ? (
                                    <React.Fragment key={o.label + '-bundled-' + props.nodeID + '-' + i}>
                                        <DropdownOption
                                            option={{
                                                label: o.label,
                                                onClick: () => {
                                                    props.submit(o.value)
                                                    setBundledVariable(o.value)
                                                },
                                                disabled: o.disabled
                                            }}
                                        />
                                    </React.Fragment>
                                ) : null)}
                            </DropdownOptions>
                        </Dropdown>
                    )
            }
        else
            return null
    }, [props.node, bundledVariable, searchString, props.canRender])
}

EmbeddedInput.propTypes = {
    canRender: PropTypes.bool,
    node: PropTypes.object,
    data: PropTypes.object,
    type: PropTypes.string,
    submit: PropTypes.func
}