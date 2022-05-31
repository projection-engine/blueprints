import createGroupShortcut from "../../components/utils/createGroupShortcut"
import EventTick from "./nodes/events/EventTick"
import deleteNode from "../../components/utils/deleteNode"
import cloneClass from "../../../../engine/utils/cloneClass"
import EntityReference from "./nodes/utils/EntityReference"
import Setter from "./nodes/utils/Setter"
import Getter from "./nodes/utils/Getter"

import {v4 as uuidv4} from "uuid"
import KEYS from "../../../../engine/templates/KEYS"

export default function getHotKeys(hook, setAlert, toCopy, setToCopy, save) {
    return [
        {
            require: [KEYS.KeyG],
            callback: () => {
                console.log(hook.selected)
                if (hook.selected.length > 0)
                    createGroupShortcut(hook)
            }
        },
        {
            require: [KEYS.ControlLeft, KEYS.KeyS],
            callback: save
        },
        {
            require: [KEYS.ControlLeft, KEYS.KeyC],
            callback: () => {
                setToCopy(hook.selected)
                if (hook.selected.length > 0)
                    setAlert({
                        type: 'success',
                        message: 'Entities copied.'
                    })
            }
        },
        {
            require: [KEYS.Delete],
            callback: () => {
                // TODO - REWORK
                const clone = [...hook.selected]
                hook.setSelected([])
                clone.forEach(n => {
                    if (!(hook.nodes.find(nod => nod.id === n) instanceof EventTick))
                        deleteNode(n, hook)
                })
            }
        },
        {
            require: [KEYS.ControlLeft, KEYS.KeyV],
            callback: () => {
                toCopy.forEach(toC => {
                    const toCopyNode = hook.nodes.find(n => n.id === toC)
                    if (toCopyNode && !(toCopyNode instanceof EventTick)) {
                        const nodeEl = document.getElementById(toC).parentNode
                        const transformation = nodeEl
                            .getAttribute('transform')
                            .replace('translate(', '')
                            .replace(')', '')
                            .split(' ')

                        const clone = cloneClass(toCopyNode)

                        switch (true) {
                            case clone instanceof Getter:
                                clone.id = clone.id.split('/getter/')[0] + '/getter/' + uuidv4()
                                break
                            case clone instanceof Setter:
                                clone.id = clone.id.split('/setter/')[0] + '/setter/' + uuidv4()
                                break
                            case clone instanceof EntityReference:
                                clone.id = clone.id.split('/')[0] + '/' + uuidv4()
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