import {materialAvailable} from "../workflows/material/available/MaterialAvailable";
import {basicAvailable} from "../workflows/basic/available/BasicAvailable";
import {algebraAvailable} from "../workflows/algebra/available/AlgebraAvailable";

export default function handleDropBoard(data) {
    let newNode

    const find = (current) => {
        let n = current.find(el => el.dataTransfer === data)
        if (n)
            n = n.getNewInstance()

        return n
    }
    const basic = basicAvailable,
        algebra = algebraAvailable

    newNode = find(materialAvailable)
    if (!newNode)
        newNode = find(basic)
    if (!newNode)
        newNode = find(algebra)

    console.log(newNode)
    return newNode
}