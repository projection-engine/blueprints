import {useContext, useEffect, useMemo, useState} from "react"
import QuickAccessProvider from "../../../../hooks/QuickAccessProvider"
import EVENTS from "../../../../templates/EVENTS"
import useFlow from "../../components/hooks/useFlow"
import Material from "../utils/nodes/Material"
import TextureSample from "../utils/nodes/TextureSample"
import LoaderProvider from "../../../../../components/loader/LoaderProvider"
import getNewInstance from "../utils/getNewInstance"
import FileSystem from "../../../../utils/files/FileSystem"
import GPUContextProvider from "../../../viewport/hooks/GPUContextProvider"
import getHotKeys from "../../scripts/utils/getHotKeys"
import useHotKeys from "../../../../../components/hot-keys/useHotKeys"


export default function useShortcuts(hook, setAlert, optionsData, registryID) {
    const [toCopy, setToCopy] = useState([])
    const actions = useMemo(() => {
        return getHotKeys(hook, setAlert, toCopy, setToCopy, () => optionsData[1].onClick())
    }, [hook.nodes, hook.links, toCopy, optionsData, hook.selected, hook.changed])
    useHotKeys({
        focusTargetLabel: "Material editor",
        focusTargetIcon: "texture",
        focusTarget: registryID + "-board",
        actions
    })

}