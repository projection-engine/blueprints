import {useMemo, useState} from "react";

export default function useBoard(initialNodes=[], initialLinks=[]){
    const [nodes, setNodes] = useState(initialNodes)
    const [links, setLinks] = useState(initialLinks)
    const output = useMemo(() => {
        let response = []
        links.forEach(link =>{

        })
        return response
    }, [nodes, links])


    return {
        setNodes,
        output,
        nodes,
        links,
        setLinks
    }
}