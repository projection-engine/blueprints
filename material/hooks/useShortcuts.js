import {useMemo, useState} from "react"
import getHotKeys from "../../components/utils/getHotKeys"
import useHotKeys from "../../../../hooks/hot-keys/useHotKeys"
import KEYS from "../../../../engine/templates/KEYS"


export default function useShortcuts(hook, setAlert, optionsData, registryID, scriptView) {
    const [toCopy, setToCopy] = useState([])
    const actions = useMemo(() => {
        if(!scriptView)
            return [
                ...getHotKeys(hook, setAlert, toCopy, setToCopy, () => optionsData[1].onClick()),
                {
                    label: "Preview material (select mesh on viewport)",
                    require: [KEYS.Mouse0]
                },
            ]
        return getHotKeys(hook, setAlert, toCopy, setToCopy, () => optionsData[1].onClick()) 
    }, [hook.nodes, hook.links, toCopy, optionsData, hook.selected, hook.changed])
    useHotKeys({
        focusTargetLabel: scriptView ? "Script editor" : "Material editor",
        focusTargetIcon: scriptView ? "code" : "texture",
        focusTarget: registryID + "-board",
        actions
    })

}