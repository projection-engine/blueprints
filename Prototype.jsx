import Board from "./components/Board";
import Rgb from "./templates/nodes/Rgb";
import useBoard from "./hooks/useBoard";
import AlgebraOperation from "./templates/operations/AlgebraOperation";
import {useLayoutEffect} from "react";
import Material from "./templates/Material";


export default function Prototype() {
    const n = [
        new Rgb(0, 0, 0),
        new Rgb(0, 0, 0),
        new AlgebraOperation(),
        new Material(),
    ]
    const hook = useBoard([], [])
    useLayoutEffect(() => {
        hook.setNodes(n)
    }, [])
    return (
        <Board hook={hook}/>
    )
}