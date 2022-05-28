import EventTick from "../nodes/events/EventTick";

import Print from "../nodes/utils/Print";
import Add from "../nodes/math/Add";
import ConstantNumber from '../nodes/math/ConstantNumber'
import OnSpawn from "../nodes/events/OnSpawn";
import SetViewTarget from "../nodes/camera/SetViewTarget";
import GetCameraPosition from "../nodes/camera/GetCameraPosition";
import SetCameraPosition from "../nodes/camera/SetCameraPosition";
import Multiply from "../nodes/math/Multiply";
import Divide from "../nodes/math/Divide";
import Subtract from "../nodes/math/Subtract";
import KeyPress from "../nodes/events/KeyPress";

export const allNodes = [

    {
        label: 'OnSpawn',
        dataTransfer: 'OnSpawn',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new OnSpawn()
    },
    {
        label: 'SetViewTarget',
        dataTransfer: 'SetViewTarget',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetViewTarget()
    },

    {
        label: 'GetCameraPosition',
        dataTransfer: 'GetCameraPosition',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GetCameraPosition()
    },

    {
        label: 'SetCameraPosition',
        dataTransfer: 'SetCameraPosition',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetCameraPosition()
    },
    {
        label: 'EventTick',
        dataTransfer: 'EventTick',
        tooltip: 'Runs method every frame.',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new EventTick()
    },

    {
        label: 'Add',
        dataTransfer: 'Add',
        tooltip: 'Adds two numeric values',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Add()
    },
    {
        label: 'KeyPress',
        dataTransfer: 'KeyPress',
        tooltip: 'Executes on key down, key up and hold',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new KeyPress()
    },

    {
        label: 'Subtract',
        dataTransfer: 'Subtract',
        tooltip: 'Subtracts two numeric values',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Subtract()
    },
    {
        label: 'Multiply',
        dataTransfer: 'Multiply',
        tooltip: 'Multiplies two numeric values',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Multiply()
    },
    {
        label: 'Divide',
        dataTransfer: 'Divide',
        tooltip: 'Divides two numeric values',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Divide()
    },

    {
        label: 'Print',
        dataTransfer: 'Print',
        tooltip: 'Prints value to console',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Print()
    },
    {
        label: 'Number',
        dataTransfer: 'Number',
        tooltip: 'Adds number to script state',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new ConstantNumber()
    },

]
