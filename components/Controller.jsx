import {useLayoutEffect, useState} from "react";
import styles from '../styles/Controller.module.css'
import useEngine from "../../components/ui/hooks/useEngine";
import randomID from "../../components/ui/utils/randomID";
import Viewport from "../../components/ui/components/viewport/Viewport";
export default function Controller(){
    const [id, setId] = useState()

    const [engine, debugMode, profiler, pushToEngine] = useEngine(id, true)

    useLayoutEffect(() => {
        setId(randomID())
    }, [])

    return(
        <div className={styles.wrapper} >
            <h1 className={styles.header}>
                <span className={'material-icons-round'} style={{fontSize: '1.1rem'}}>tune</span>
                Details
            </h1>
         <div className={styles.content}>
             <div className={styles.viewport} >
                 <Viewport id={id} debugMode={debugMode} engine={engine}/>
             </div>
         </div>

        </div>
    )
}