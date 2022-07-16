import handleDropBoard from "./handleDropBoard"
import deleteNode from "./deleteNode"

export default function getBoardOptions(pushNode, hook, links, deleteLink) {
    return [
        {
            requiredTrigger: "data-node",
            label: "Delete",
            icon: "delete",
            onClick: (node) => {
                deleteNode(node.getAttribute("data-node"), hook)
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
            onClick: (node) => {
                const attr = node.getAttribute("data-group")
                hook.setChanged(true)
                hook.setNodes(prev => prev.filter(pr => pr.id !== attr))
            }
        },

    ]
}