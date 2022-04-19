import PropTypes from "prop-types";
import {useMemo} from "react";
import {DATA_TYPES} from "../DATA_TYPES";
import styles from '../styles/Node.module.css'

export default function NodeShowcase(props) {
    const attributesToRender = useMemo(() => {

        return props.node.inputs.map(n => {
            if ((n.type === DATA_TYPES.TEXTURE || n.type === DATA_TYPES.COLOR) && !n.accept && !n.hiddenShowcase)
                return {
                    type: n.type,
                    label: n.label,
                    value: props.node[n.key]
                }
            else
                return null
        }).filter(n => n !== null)
    }, [props.node])
    if (attributesToRender.length > 0)
        return (
            <div className={styles.showcase}>
                {attributesToRender.map((a, i) =>
                    a.type === DATA_TYPES.TEXTURE ?
                        <div className={styles.showcaseWrapper} key={props.node.id + '-input-' + i}
                             style={{background: a.value?.preview ? undefined : 'black'}}>

                            {a.value?.preview ?
                                <img src={a.value?.preview} alt={a.label}/>

                                :
                                <div className={styles.error}>
                                    Missing texture
                                </div>
                            }
                        </div>
                        :
                        <div className={styles.showcaseWrapper} style={{background: a.value}}
                             key={props.node.id + '-input-' + i}/>
                )}
            </div>
        )
    else
        return null
}
NodeShowcase.propTypes = {
    node: PropTypes.object
}