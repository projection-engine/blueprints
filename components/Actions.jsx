import styles from '../styles/Actions.module.css'
import PropTypes from "prop-types";
import {Button} from "@f-ui/core";
import Response from "../templates/Response";
import makePackage from "../utils/makePackage";
import Dexie from "dexie";
import {useEffect, useState} from "react";

export default function Actions(props) {

    return (
        <div
            className={styles.wrapper}
        >
            <div className={styles.content}>
                <Button
                    className={styles.button}
                    onClick={() => props.submitPackage(makePackage(props.hook), true)}>
                    <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save_alt</span>
                    Save & close
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => props.submitPackage(makePackage(props.hook), false)}>
                    <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>save</span>
                    Save
                </Button>
                <Button className={styles.button} onClick={() => {
                    try {
                        props.hook.compile()
                        props.hook.setAlert({
                            type: 'success',
                            message: 'Compile successful'
                        })
                    } catch (e) {
                        props.hook.setAlert({
                            type: 'error',
                            message: 'Compile error'
                        })
                    }
                }}>
                    <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>code</span>
                    Compile methods
                </Button>
            </div>
            <div className={styles.content}>
                <Button className={styles.button} onClick={() => {
                    makePackage(props.hook)

                    let element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(pack)));
                    element.setAttribute('download', 'Prototype-file.pj');

                    element.style.display = 'none';
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                }}>
                    <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>upload</span>
                    Export
                </Button>
                <Button className={styles.button}>
                    <span className={'material-icons-round'} style={{fontSize: '1.2rem'}}>download</span>
                    Import
                </Button>
            </div>
        </div>
    )

}

Actions.propTypes = {
    hook: PropTypes.object,
    submitPackage: PropTypes.func.isRequired
}