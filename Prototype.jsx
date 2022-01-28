import Board from "./components/Board";
import usePrototype from "./hooks/usePrototype";
import NodeEditor from "./components/NodeEditor";
import Available from "./components/Available";
import styles from './styles/Board.module.css'

import {useContext, useEffect, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import ControlProvider from "../tabs/components/ControlProvider";
import makePackage from "./utils/makePackage";
import ResizableBar from "../resizable/ResizableBar";

export default function Prototype(props) {
    const hook = usePrototype(props.file, props.workflow)
    const ref = useRef()
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n.constructor.name === props.workflow)
    }, [hook.nodes])
    const toolBarContext = useContext(ControlProvider)
    useEffect(() => {
        toolBarContext.setOptions([
            {
                label: 'Save',
                disabled: hook.disabled,
                icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>,
                onClick: () => {
                    props.submitPackage(makePackage(hook), false)
                }
            },
            {
                label: 'Save & close',
                disabled: hook.disabled,
                icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>,
                onClick: () => props.submitPackage(makePackage(hook), true)
            },
            {
                label: 'Import script',
                icon: <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>download</span>,
                onClick: () => null,
                disabled: true
            }
        ])
    }, [hook.nodes, hook.links])

    return (
        <div className={styles.prototypeWrapper} ref={ref}>
            <NodeEditor hook={hook}
                        selected={!hook.selected && fallbackSelected ? fallbackSelected.id : hook.selected}/>
            <ResizableBar type={"width"}/>
            <div className={styles.prototypeWrapperBoard}>
                <Board
                    setAlert={props.setAlert}
                    parentRef={ref}
                    hook={hook}
                    selected={hook.selected}
                    setSelected={hook.setSelected}/>
            </div>

            <Available/>
        </div>
    )
}

Prototype.propTypes = {
    setAlert: PropTypes.func.isRequired,
    file: PropTypes.object,
    submitPackage: PropTypes.func.isRequired,
    workflow: PropTypes.oneOf(['PBRMaterial'])
}