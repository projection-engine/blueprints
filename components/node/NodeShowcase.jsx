import PropTypes from "prop-types"
import React, {useContext, useMemo} from "react"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import styles from "../../styles/Node.module.css"
import Preview from "../../../../../components/preview/Preview"
import FileSystem from "../../../../libs/FileSystem"
import TexturePreview from "./TexturePreview"
import NodeProvider from "../../context/NodeProvider"

export default function NodeShowcase() {
    const node = useContext(NodeProvider)
    const attributesToRender = useMemo(() => {
        return node.inputs.map(n => {
            if ((n.type === DATA_TYPES.TEXTURE || n.type === DATA_TYPES.COLOR) && !n.accept && !n.hiddenShowcase)
                return {
                    type: n.type,
                    label: n.label,
                    value: node[n.key]
                }
            return null
        }).filter(n => n !== null)[0]
    }, [node])

    if (attributesToRender !== undefined)
        return (
            <div className={styles.showcase}>
                {attributesToRender.type === DATA_TYPES.TEXTURE ?
                    <TexturePreview attribute={attributesToRender}/>
                    :
                    <div className={styles.showcaseWrapper} style={{background: attributesToRender.value}}/>
                }
            </div>
        )
    else
        return null
}
