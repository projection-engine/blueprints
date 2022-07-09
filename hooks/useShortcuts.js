import {useMemo, useState} from "react"
import getHotKeys from "../utils/board/getHotKeys"

import KEYS from "../../../engine/templates/KEYS"
import useHotKeys from "../../shortcuts/hooks/useHotKeys"


export default function useShortcuts(hook,  save, internalID) {
    const [toCopy, setToCopy] = useState([])
    const actions = useMemo(() => {
        return getHotKeys(hook,  toCopy, setToCopy, save)
    }, [hook.nodes, hook.links, toCopy, hook.selected, hook.changed])
    useHotKeys({
        focusTargetLabel:  "Material editor",
        focusTargetIcon:  "texture",
        focusTarget: internalID,
        actions
    })

}