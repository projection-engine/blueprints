import {useMemo, useState} from "react"
import getHotKeys from "../utils/board/getHotKeys"

import KEYS from "../../../engine/templates/KEYS"
import useHotKeys from "../../shortcuts/hooks/useHotKeys"


export default function useShortcuts(hook,  save, internalID, scriptView) {
    const [toCopy, setToCopy] = useState([])
    const actions = useMemo(() => {
        if(!scriptView)
            return [
                ...getHotKeys(hook,  toCopy, setToCopy, save),
                {
                    label: "Preview material (select mesh on viewport)",
                    require: [KEYS.Mouse0]
                },
            ]
        return getHotKeys(hook, toCopy, setToCopy, save)
    }, [hook.nodes, hook.links, toCopy, hook.selected, hook.changed])
    useHotKeys({
        focusTargetLabel: scriptView ? "Script editor" : "Material editor",
        focusTargetIcon: scriptView ? "code" : "texture",
        focusTarget: internalID,
        actions
    })

}