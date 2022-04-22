import PropTypes from "prop-types";
import {useMemo} from "react";
import {DATA_TYPES} from "../DATA_TYPES";
import styles from '../styles/Node.module.css'
import usePreview from "../../../../components/preview/usePreview";
import Preview from "../../../../components/preview/Preview";

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
                        <TexturePreview path={props.path} node={props.node} attribute={a}/>
                        // <div className={styles.showcaseWrapper} key={props.node.id + '-input-' + i}
                        //      style={{background: a.value?.preview ? undefined : 'black'}}>
                        //
                        //     {a.value?.preview ?
                        //         <img ref={ref} src={a.value?.preview} alt={a.label}/>
                        //
                        //         :
                        //         <div className={styles.error}>
                        //             Missing texture
                        //         </div>
                        //     }
                        // </div>
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
            {/*<img ref={ref} src={undefined} alt={'Texture'}/>*/}
        </div>
    )
}

// props.node[props.attribute.key]
TexturePreview.propTypes = {
    node: PropTypes.object,
    attribute: PropTypes.object,
    path: PropTypes.string
}