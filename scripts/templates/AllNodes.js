import SetWorldRotation from "../../../../engine/shared/nodes/transformation/SetWorldRotation";
import SetWorldTranslation from "../../../../engine/shared/nodes/transformation/SetWorldTranslation";
import GetWorldTranslation from "../../../../engine/shared/nodes/transformation/GetWorldTranslation";
import GetWorldRotation from "../../../../engine/shared/nodes/transformation/GetWorldRotation";
import QuaternionToEuler from "../../../../engine/shared/nodes/transformation/QuaternionToEuler";
import Add from "../../../../engine/shared/nodes/operators/math/Add";
import Subtract from "../../../../engine/shared/nodes/operators/math/Subtract";
import Multiply from "../../../../engine/shared/nodes/operators/math/Multiply";
import Divide from "../../../../engine/shared/nodes/operators/math/Divide";
import ToVector from "../../../../engine/shared/nodes/operators/conversions/ToVector";
import FromVector from "../../../../engine/shared/nodes/operators/conversions/FromVector";
import SetLocalRotation from "../../../../engine/shared/nodes/transformation/SetLocalRotation";
import SetTransformationRelativeOrigin
    from "../../../../engine/shared/nodes/transformation/SetTransformationRelativeOrigin";
import Print from "../../../../engine/shared/nodes/utils/Print";
import Xor from "../../../../engine/shared/nodes/operators/boolean/Xor";
import Or from "../../../../engine/shared/nodes/operators/boolean/Or";
import NotEqual from "../../../../engine/shared/nodes/operators/boolean/NotEqual";
import Not from "../../../../engine/shared/nodes/operators/boolean/Not";
import Nor from "../../../../engine/shared/nodes/operators/boolean/Nor";
import Nand from "../../../../engine/shared/nodes/operators/boolean/Nand";
import LessEqual from "../../../../engine/shared/nodes/operators/boolean/LessEqual";
import Less from "../../../../engine/shared/nodes/operators/boolean/Less";
import GreaterEqual from "../../../../engine/shared/nodes/operators/boolean/GreaterEqual";
import Greater from "../../../../engine/shared/nodes/operators/boolean/Greater";
import Equal from "../../../../engine/shared/nodes/operators/boolean/Equal";
import And from "../../../../engine/shared/nodes/operators/boolean/And";
import Branch from "../../../../engine/shared/nodes/branches/Branch";
import EventTick from "../../../../engine/shared/nodes/events/EventTick";
import RandomFloat from "../../../../engine/shared/nodes/utils/RandomFloat";
import RandomInt from "../../../../engine/shared/nodes/utils/RandomInt";
import MousePosition from "../../../../engine/shared/nodes/events/MousePosition";
import MouseY from "../../../../engine/shared/nodes/events/MouseY";
import MouseX from "../../../../engine/shared/nodes/events/MouseX";
import Cos from "../../../../engine/shared/nodes/operators/math/Cos";
import Sin from "../../../../engine/shared/nodes/operators/math/Sin";
import ACos from "../../../../engine/shared/nodes/operators/math/ACos";
import ASin from "../../../../engine/shared/nodes/operators/math/ASin";
import Tan from "../../../../engine/shared/nodes/operators/math/Tan";
import ATan from "../../../../engine/shared/nodes/operators/math/ATan";
import Mod from "../../../../engine/shared/nodes/operators/math/Mod";
import Abs from "../../../../engine/shared/nodes/operators/math/Abs";
import KeyPress from "../../../../engine/shared/nodes/events/KeyPress";
import RotateVector from "../../../../engine/shared/nodes/transformation/RotateVector";
import GetCameraPosition from "../../../../engine/shared/nodes/camera/GetCameraPosition";
import GetCameraRotation from "../../../../engine/shared/nodes/camera/GetCameraRotation";
import SetCameraFOV from "../../../../engine/shared/nodes/camera/SetCameraFOV";
import SetCameraPosition from "../../../../engine/shared/nodes/camera/SetCameraPosition";
import SetCameraRotation from "../../../../engine/shared/nodes/camera/SetCameraRotation";
import UpdateCameraLookAt from "../../../../engine/shared/nodes/camera/UpdateCameraLookAt";
import UpdateCameraProjection from "../../../../engine/shared/nodes/camera/UpdateCameraProjection";
import SetViewTarget from "../../../../engine/shared/nodes/camera/SetViewTarget";
import OnSpawn from "../../../../engine/shared/nodes/events/OnSpawn";
import QuatRotateZ from "../../../../engine/shared/nodes/operators/math/QuatRotateZ";
import QuatRotateY from "../../../../engine/shared/nodes/operators/math/QuatRotateY";
import QuatRotateX from "../../../../engine/shared/nodes/operators/math/QuatRotateX";
import OnInterval from "../../../../engine/shared/nodes/events/OnInterval";
import FollowAround from "../../../../engine/shared/nodes/camera/FollowAround";


export const allNodes = [
    {
        label: 'FollowAround',
        dataTransfer: 'FollowAround',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new FollowAround()
    },

    {
        label: 'OnInterval',
        dataTransfer: 'OnInterval',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new OnInterval()
    },

    {
        label: 'QuatRotateX (pitch)',
        dataTransfer: 'QuatRotateX',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new QuatRotateX()
    },
    {
        label: 'QuatRotateY (yaw)',
        dataTransfer: 'QuatRotateY',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new QuatRotateY()
    },
    {
        label: 'QuatRotateZ (roll)',
        dataTransfer: 'QuatRotateZ',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new QuatRotateZ()
    },


    {
        label: 'On Spawn',
        dataTransfer: 'OnSpawn',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new OnSpawn()
    },
    {
        label: 'Set View Target',
        dataTransfer: 'SetViewTarget',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetViewTarget()
    },
    {
        label: 'Window Resize',
        dataTransfer: 'WindowResize',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new WindowResize()
    },
    {
        label: 'Get Camera Position',
        dataTransfer: 'GetCameraPosition',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GetCameraPosition()
    },
    {
        label: 'Get Camera Rotation',
        dataTransfer: 'GetCameraRotation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GetCameraRotation()
    },
    {
        label: 'Set Camera Aspect Ratio',
        dataTransfer: 'SetCameraAspectRatio',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetCameraAspectRatio()
    },
    {
        label: 'Set Camera FOV',
        dataTransfer: 'SetCameraFOV',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetCameraFOV()
    },
    {
        label: 'Set Camera Position',
        dataTransfer: 'SetCameraPosition',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetCameraPosition()
    },
    {
        label: 'Set Camera Rotation',
        dataTransfer: 'SetCameraRotation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetCameraRotation()
    },
    {
        label: 'Update Camera LookAt',
        dataTransfer: 'UpdateCameraLookAt',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new UpdateCameraLookAt()
    },
    {
        label: 'Update Camera Projection',
        dataTransfer: 'UpdateCameraProjection',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new UpdateCameraProjection()
    },


    {
        label: 'Rotate Vector',
        dataTransfer: 'RotateVector',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new RotateVector()
    },
    {
        label: 'Event Tick',
        dataTransfer: 'EventTick',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new EventTick()
    },

    {
        label: 'Get World Rotation',
        dataTransfer: 'GetWorldRotation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GetWorldRotation()
    },
    {
        label: 'Get World Translation',
        dataTransfer: 'GetWorldTranslation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GetWorldTranslation()
    },
    {
        label: 'Set world rotation',
        dataTransfer: 'SetWorldRotation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetWorldRotation()
    },
    {
        label: 'Set world translation',
        dataTransfer: 'SetWorldTranslation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetWorldTranslation()
    },
    {
        label: 'Quaternion to Euler',
        dataTransfer: 'QuaternionToEuler',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new QuaternionToEuler()
    },
    {
        label: 'Add',
        dataTransfer: 'Add',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Add()
    }
    ,
    {
        label: 'Subtract',
        dataTransfer: 'Subtract',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Subtract()
    },
    {
        label: 'Multiply',
        dataTransfer: 'Multiply',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Multiply()
    },
    {
        label: 'Divide',
        dataTransfer: 'Divide',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Divide()
    } ,


    {
        label: 'ToVector',
        dataTransfer: 'ToVector',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new ToVector()
    },
    {
        label: 'FromVector',
        dataTransfer: 'FromVector',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new FromVector()
    },
    {
        label: 'SetLocalRotation',
        dataTransfer: 'SetLocalRotation',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetLocalRotation()
    },
    {
        label: 'SetTransformationRelativeOrigin',
        dataTransfer: 'SetTransformationRelativeOrigin',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new SetTransformationRelativeOrigin()
    },
    {
        label: 'Print',
        dataTransfer: 'Print',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Print()
    },



    {
        label: 'Branch',
        dataTransfer: 'Branch',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Branch()
    },
    {
        label: 'And',
        dataTransfer: 'And',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new And()
    },
    {
        label: 'Equal',
        dataTransfer: 'Equal',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Equal()
    },
    {
        label: 'Greater',
        dataTransfer: 'Greater',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Greater()
    },
    {
        label: 'GreaterEqual',
        dataTransfer: 'GreaterEqual',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new GreaterEqual()
    },
    {
        label: 'Less',
        dataTransfer: 'Less',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Less()
    },
    {
        label: 'LessEqual',
        dataTransfer: 'LessEqual',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new LessEqual()
    },
    {
        label: 'Nand',
        dataTransfer: 'Nand',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Nand()
    },
    {
        label: 'Nor',
        dataTransfer: 'Nor',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Nor()
    },

    {
        label: 'Not',
        dataTransfer: 'Not',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Not()
    },
    {
        label: 'NotEqual',
        dataTransfer: 'NotEqual',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new NotEqual()
    },
    {
        label: 'Or',
        dataTransfer: 'Or',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Or()
    },
    {
        label: 'Xor',
        dataTransfer: 'Xor',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Xor()
    },

    {
        label: 'Random Float',
        dataTransfer: 'RandomFloat',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new RandomFloat()
    },

    {
        label: 'Random Int',
        dataTransfer: 'RandomInt',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new RandomInt()
    },


    {
        label: 'Mouse X',
        dataTransfer: 'MouseX',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new MouseX()
    },

    {
        label: 'Mouse Y',
        dataTransfer: 'MouseY',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new MouseY()
    },

    {
        label: 'Mouse Position',
        dataTransfer: 'MousePosition',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new MousePosition()
    },



    {
        label: 'Cosine',
        dataTransfer: 'Cos',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Cos()
    },
    {
        label: 'Sine',
        dataTransfer: 'Sin',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Sin()
    },
    {
        label: 'Arc Cosine',
        dataTransfer: 'ACos',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new ACos()
    },
    {
        label: 'Arc Sine',
        dataTransfer: 'ASin',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new ASin()
    },
    {
        label: 'Tangent',
        dataTransfer: 'Tan',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Tan()
    },
    {
        label: 'Arc Tangent',
        dataTransfer: 'ATan',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new ATan()
    },
    {
        label: 'Modulo',
        dataTransfer: 'Mod',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Mod()
    },   {
        label: 'Absolute',
        dataTransfer: 'Abs',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new Abs()
    },
    {
        label: 'Key Press',
        dataTransfer: 'KeyPress',
        tooltip: 'TODO',
        icon: <span className={'material-icons-round'}>functions</span>,
        getNewInstance: () => new KeyPress()
    },
]
