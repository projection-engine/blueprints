import PropTypes from "prop-types";
import {useMemo} from "react";
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES";
import styles from '../styles/Node.module.css'
import Preview from "../../../../../components/preview/Preview";

export default function NodeShowcase(props) {
    const attributesToRender = useMemo(() => {

        return props.node.inputs.map(n => {
            if ((n.type === DATA_TYPES.TEXTURE || n.type === DATA_TYPES.COLOR) && !n.accept && !n.hiddenShowcase)
                return {
                    type: n.type,
                    label: n.label,
                    value: props.node[n.key]
                }
            return null
        }).filter(n => n !== null)[0]
    }, [props.node])

    if (attributesToRender !== undefined)
        return (
            <div className={styles.showcase}>
                {attributesToRender.type === DATA_TYPES.TEXTURE ?
                    <TexturePreview path={props.path} node={props.node} attribute={attributesToRender}/>
                    :
                    <div className={styles.showcaseWrapper} style={{background: attributesToRender.value}}/>
                }
            </div>
        )
    else
        return null
}
NodeShowcase.propTypes = {
    node: PropTypes.object,
    path: PropTypes.string
}

function TexturePreview(props) {
    const p = useMemo(() => {
        return props.path + '\\previews\\' + props.attribute.value?.registryID + '.preview'
    }, [props.attribute.value])

    return (
        <div className={styles.showcaseWrapper} style={{display: 'grid', justifyItems: 'center'}}>
            <Preview iconStyles={{fontSize: '60px'}} path={p}>
                <div className={styles.error}>
                    Missing texture
                </div>
            </Preview>

        </div>
    )
}

// props.node[props.attribute.key]
TexturePreview.propTypes = {
    node: PropTypes.object,
    attribute: PropTypes.object,
    path: PropTypes.string
}