import {materialAvailable} from "../templates/MaterialAvailable";
import {basicAvailable} from "../templates/BasicAvailable";
import handleDropBoard from "./handleDropBoard";

export default function getBoardOptions(pushNode) {
    const options = [...materialAvailable, ...basicAvailable]
    return options.map(o => {
        return {
            requiredTrigger: 'data-board',
            label: o.label,
            icon: <span className={'material-icons-round'}>{materialAvailable.indexOf(o) > -1 ? 'texture' : 'functions'}</span>,
            onClick: (_, mouseInfo) => {
                pushNode(handleDropBoard(o.dataTransfer), mouseInfo)
            }
        }
    })
}