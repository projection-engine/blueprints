import createGroupShortcut from "./createGroupShortcut"
import EventTick from "../../scripts/utils/nodes/events/EventTick"
import cloneClass from "../../../../engine/utils/cloneClass"
import EntityReference from "../../scripts/utils/nodes/utils/EntityReference"
import Setter from "../../scripts/utils/nodes/utils/Setter"
import Getter from "../../scripts/utils/nodes/utils/Getter"

import {v4 as uuidv4} from "uuid"
import KEYS from "../../../../engine/templates/KEYS"

export default function getHotKeys(hook, toCopy, setToCopy, save) {
    return [
        {
            label: "Select",
            require: [KEYS.Mouse0]
        },
        {
            label: "Select multiple",
            require: [KEYS.ControlLeft, KEYS.Mouse0]
        },
        {
            label: "Select all",
            require: [KEYS.KeyA],
            callback: () => hook.setSelected(hook.nodes.map(e => e.id))
        },
        {
            label: "Invert selection",
            require: [KEYS.ControlLeft, KEYS.KeyI],
            callback: () => {
                const newArr = []
                const notValid = {}
                for(let i in hook.selected){
                    notValid[ hook.selected[i]] = true
                }
                for(let i in  hook.nodes){
                    const id = hook.nodes[i].id
                    if(!notValid[id])
                        newArr.push(id)
                }
                hook.setSelected(newArr)
            }
        },
        {
            label: "Move multiple",
            disabled: hook.selected.length === 0,
            require: [KEYS.ControlLeft, KEYS.Mouse0]
        },
        {
            label: "Group",
            disabled: hook.selected.length === 0,
            require: [KEYS.KeyG],
            callback: () => {
                if (hook.selected.length > 0)
                    createGroupShortcut(hook)
            }
        },
        {
            label: "Save",
            disabled: !hook.changed,
            require: [KEYS.ControlLeft, KEYS.KeyS],
            callback: save
        },
        {
            label: "Copy",
            disabled: hook.selected.length === 0,
            require: [KEYS.ControlLeft, KEYS.KeyC],
            callback: () => {
                setToCopy(hook.selected)
                if (hook.selected.length > 0)
                    alert.pushAlert( "success",
                        "Entities copied." )
            }
        },
        {
            label: "Delete",
            disabled: hook.selected.length === 0,
            require: [KEYS.Delete],
            callback: () => {
                const clone = [...hook.selected]
                const newNodes= hook.nodes.filter(currentNode => !clone.find(e => e === currentNode.id)),
                    newLinks = hook.links.filter(currentLink => !clone.find(e => e === currentLink.target.id || e === currentLink.source.id))
                hook.setSelected([])
                hook.setLinks(newLinks)
                hook.setNodes(newNodes)
            }
        },
        {
            label: "Paste",
            disabled: toCopy.length === 0,
            require: [KEYS.ControlLeft, KEYS.KeyV],
            callback: () => {
                toCopy.forEach(toC => {
                    const toCopyNode = hook.nodes.find(n => n.id === toC)
                    if (toCopyNode && !(toCopyNode instanceof EventTick)) {
                        const nodeEl = document.getElementById(toC).parentNode
                        const transformation = nodeEl
                            .getAttribute("transform")
                            .replace("translate(", "")
                            .replace(")", "")
                            .split(" ")

                        const clone = cloneClass(toCopyNode)

                        switch (true) {
                        case clone instanceof Getter:
                            clone.id = clone.id.split("/getter/")[0] + "/getter/" + uuidv4()
                            break
                        case clone instanceof Setter:
                            clone.id = clone.id.split("/setter/")[0] + "/setter/" + uuidv4()
                            break
                        case clone instanceof EntityReference:
                            clone.id = clone.id.split("/")[0] + "/" + uuidv4()
                            break
                        default:
                            clone.id = uuidv4()
                            break
                        }

                        clone.x = parseFloat(transformation[0]) + 5
                        clone.y = parseFloat(transformation[1]) + 5

                        hook.setNodes(prev => {
                            return [...prev, clone]
                        })
                    }
                })
            }
        }
    ]
}