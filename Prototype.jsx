import Board from "./components/Board";
import usePrototype from "./hooks/usePrototype";
import NodeEditor from "./components/NodeEditor";
import Available from "./components/Available";
import styles from './styles/Board.module.css'
import Actions from "./components/Actions";
import {useMemo, useRef} from "react";
import PropTypes from "prop-types";

export default function Prototype(props) {
    const hook = usePrototype(props.file, props.workflow)
    const ref=useRef()
    const fallbackSelected = useMemo(() => {
        return hook.nodes.find(n => n.constructor.name === props.workflow)
    }, [hook.nodes])

    return (
        <div className={styles.prototypeWrapper} ref={ref}>
            <NodeEditor hook={hook} selected={!hook.selected && fallbackSelected ? fallbackSelected.id : hook.selected}/>
            <div className={styles.prototypeWrapperBoard}>
                <Actions
                    setAlert={props.setAlert}
                    hook={hook}
                    submitPackage={props.submitPackage}/>
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

Prototype.propTypes={
    setAlert: PropTypes.func.isRequired,
    file: PropTypes.object,
    submitPackage: PropTypes.func.isRequired,
    workflow: PropTypes.oneOf(['PBRMaterial'])
}