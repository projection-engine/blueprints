import {KEYS} from "../../../../pages/project/utils/hooks/useHotKeys";
import createGroupShortcut from "../../base/utils/createGroupShortcut";
import mapNodes from "./mapNodes";
import compile from "./compile";
import EventTick from "../../../../engine/shared/nodes/events/EventTick";
import deleteNode from "../../base/utils/deleteNode";
import cloneClass from "../../../../engine/utils/cloneClass";
import EntityReference from "../../../../engine/shared/nodes/events/EntityReference";
import Setter from "../../../../engine/shared/nodes/utils/Setter";
import Getter from "../../../../engine/shared/nodes/utils/Getter";

import {v4 as uuidv4} from 'uuid';

export default function getHotKeys(hook, props, toCopy, setToCopy) {
    return [
        {
            require: [KEYS.KeyG],
            callback: () => {
                if (hook.selected.length > 0)
                    createGroupShortcut(hook)
            }
        },
        {
            require: [KEYS.ControlLeft, KEYS.KeyS],
            callback: () => {

                const response = mapNodes(compile(hook.nodes, hook.links, hook.variables))
                props.submitPackage(
                    response,
                    false
                )
            }
        },
        {
            require: [KEYS.ControlLeft, KEYS.KeyC],
            callback: () => {
                setToCopy(hook.selected)
                if (hook.selected.length > 0)
                    props.setAlert({
                        type: 'success',
                        message: 'Entities copied.'
                    })
            }
        },
        {
            require: [KEYS.Delete],
            callback: () => {
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