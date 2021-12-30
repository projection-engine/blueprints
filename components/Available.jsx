import {useState} from "react";
import styles from '../styles/Available.module.css'
import {Button} from "@f-ui/core";
export default function Available(){
    const [hidden, setHidden] = useState(true)
    return(
        <div className={styles.wrapper} style={{width: hidden ? '35px' : undefined}}>
            <Button onClick={() => setHidden(!hidden)} className={styles.button}>
                <span className={'material-icons-round'} style={{transform: hidden ? 'rotate(180deg)': undefined}}>chevron_right</span>
            </Button>

            <div className={styles.content}>
                {/*<Button onClick={() => setHidden(!hidden)} className={styles.button}>*/}
                {/*</Button>*/}
            </div>
        </div>
    )
}