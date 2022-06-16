import {useState} from "react"

export default function useFlow() {
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [groups, setGroups] = useState([])
    const [changed, setChanged] = useState(false)
    const [impactingChange, setImpactingChange] = useState(false)
    const [selected, setSelected] = useState([])

    return {
        impactingChange, setImpactingChange,
        nodes, setNodes,
        links, setLinks,
        groups, setGroups,
        changed, setChanged,
        selected, setSelected
    }
}