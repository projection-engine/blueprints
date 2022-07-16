import FileSystem from "../../../../libs/FileSystem"
import styles from "../../styles/Node.module.css"
import Preview from "../../../../../components/preview/Preview"
import PropTypes from "prop-types"
import React, {useMemo} from "react"

export default function TexturePreview(props) {
    const p = useMemo(() => {
        return window.fileSystem.path + FileSystem.sep + "previews" + FileSystem.sep + props.attribute.value?.registryID + ".preview"
    }, [props.attribute.value])

    return (
        <div className={styles.showcaseWrapper} style={{display: "grid", justifyItems: "center"}}>
            <Preview drawOnError={true} iconStyles={{fontSize: "60px"}} path={p}>
                <div className={styles.error}>
					Missing texture
                </div>
            </Preview>
        </div>
    )
}

TexturePreview.propTypes = {
    attribute: PropTypes.object
}