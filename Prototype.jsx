import Board from "./components/Board";
import useBoard from "./hooks/useBoard";
import Controller from "./components/Controller";
import Available from "./components/Available";
import styles from './styles/Board.module.css'
import {Alert} from "@f-ui/core";
import Actions from "./components/Actions";
import {useRef} from "react";
import PropTypes from "prop-types";

export default function Prototype(props) {
    const hook = useBoard(props.file)
    const ref=useRef()

    return (
        <div className={styles.prototypeWrapper} ref={ref}>
            <Alert
                open={hook.alert.type !== undefined}
                handleClose={() => hook.setAlert({})}
                variant={hook.alert.type}
                onClick={() => null} delay={3500}>
                <div style={{color: 'var(--fabric-color-secondary)'}}>
                    {hook.alert.message}
                </div>
            </Alert>

            <Controller hook={hook} selected={hook.selected}/>
            <div className={styles.prototypeWrapperBoard}>
                <Actions hook={hook} submitPackage={props.submitPackage}/>
                <Board
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
    file: PropTypes.object,
    submitPackage: PropTypes.func.isRequired
}