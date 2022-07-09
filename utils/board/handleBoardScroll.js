export default function handleBoardScroll(ref, ) {

    ref.requestPointerLock()
    const handleMouseMove = (event) => {
        ref.scrollTop -= event.movementY
        ref.scrollLeft -= event.movementX
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", () => {
        document.exitPointerLock()
        document.removeEventListener("mousemove", handleMouseMove)
    }, {once: true})
}
