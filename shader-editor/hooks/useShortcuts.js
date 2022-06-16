import {useMemo, useState} from "react"
import getHotKeys from "../../components/utils/getHotKeys"

import KEYS from "../../../../engine/templates/KEYS"
import useHotKeys from "../../../shortcuts/hooks/useHotKeys"


export default function useShortcuts(hook,  optionsData, registryID, scriptView) {
    const [toCopy, setToCopy] = useState([])
    const actions = useMemo(() => {
        if(!scriptView)
            return [
                ...getHotKeys(hook,  toCopy, setToCopy, () => optionsData[1].onClick()),
                {
                    label: "Preview material (select mesh on viewport)",
                    require: [KEYS.Mouse0]
                },
            ]
        return getHotKeys(hook, toCopy, setToCopy, () => optionsData[1].onClick())
    }, [hook.nodes, hook.links, toCopy, optionsData, hook.selected, hook.changed])
    useHotKeys({
        focusTargetLabel: scriptView ? "Script editor" : "Material editor",
        focusTargetIcon: scriptView ? "code" : "texture",
        focusTarget: registryID + "-board",
        actions
    })

}