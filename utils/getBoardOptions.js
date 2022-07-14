import handleDropBoard from "./handleDropBoard"
import deleteNode from "./deleteNode"

export default function getBoardOptions(pushNode,setSelected, hook, links, allNodes, deleteLink, deleteGroup) {

    return [...allNodes.map(o => {
        return {
            requiredTrigger: "data-board",
            label: o.label,
            onClick: (_, mouseInfo) => {
                pushNode(handleDropBoard(o.dataTransfer, allNodes), mouseInfo)
            }
        }
    }),

    {
        requiredTrigger: "data-node",
        label: "Delete",
        icon: "delete",
        onClick: (node) => {
            deleteNode(node.getAttribute("data-node"), hook, setSelected)
        }
    },

    {
        requiredTrigger: "data-link",
        label: "Delete link",
        icon: "delete",
        onClick: (node) => deleteLink(node.getAttribute("data-link"))
    },
    {
        requiredTrigger: "data-group",
        label: "Delete comment",
        icon: "delete",
        onClick: (node) => deleteGroup(node.getAttribute("data-group"))
    },

    ]
}