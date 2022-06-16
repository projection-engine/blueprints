import EventTick from "./nodes/events/EventTick"

import Print from "./nodes/utils/Print"
import Add from "./nodes/math/Add"
import ConstantNumber from "./nodes/math/ConstantNumber"
import OnSpawn from "./nodes/events/OnSpawn"
import SetViewTarget from "./nodes/camera/SetViewTarget"
import GetCameraPosition from "./nodes/camera/GetCameraPosition"
import SetCameraPosition from "./nodes/camera/SetCameraPosition"
import Multiply from "./nodes/math/Multiply"
import Divide from "./nodes/math/Divide"
import Subtract from "./nodes/math/Subtract"
import KeyPress from "./nodes/events/KeyPress"

export const allNodes = [

    {
        label: "OnSpawn",
        dataTransfer: "OnSpawn",
        tooltip: "TODO",
        
        getNewInstance: () => new OnSpawn()
    },
    {
        label: "SetViewTarget",
        dataTransfer: "SetViewTarget",
        tooltip: "TODO",
        
        getNewInstance: () => new SetViewTarget()
    },

    {
        label: "GetCameraPosition",
        dataTransfer: "GetCameraPosition",
        tooltip: "TODO",
        
        getNewInstance: () => new GetCameraPosition()
    },

    {
        label: "SetCameraPosition",
        dataTransfer: "SetCameraPosition",
        tooltip: "TODO",
        
        getNewInstance: () => new SetCameraPosition()
    },
    {
        label: "EventTick",
        dataTransfer: "EventTick",
        tooltip: "Runs method every frame.",
        
        getNewInstance: () => new EventTick()
    },

    {
        label: "Add",
        dataTransfer: "Add",
        tooltip: "Adds two numeric values",
        
        getNewInstance: () => new Add()
    },
    {
        label: "KeyPress",
        dataTransfer: "KeyPress",
        tooltip: "Executes on key down, key up and hold",
        
        getNewInstance: () => new KeyPress()
    },

    {
        label: "Subtract",
        dataTransfer: "Subtract",
        tooltip: "Subtracts two numeric values",
        
        getNewInstance: () => new Subtract()
    },
    {
        label: "Multiply",
        dataTransfer: "Multiply",
        tooltip: "Multiplies two numeric values",
        
        getNewInstance: () => new Multiply()
    },
    {
        label: "Divide",
        dataTransfer: "Divide",
        tooltip: "Divides two numeric values",
        
        getNewInstance: () => new Divide()
    },

    {
        label: "Print",
        dataTransfer: "Print",
        tooltip: "Prints value to console",
        
        getNewInstance: () => new Print()
    },
    {
        label: "Number",
        dataTransfer: "Number",
        tooltip: "Adds number to script state",
        
        getNewInstance: () => new ConstantNumber()
    },

]
