export default function getBezierCurve({x, y}, {x1, y1}) {
    let pivots = {
        x1:
    }
    return `M${x},${y} C${pivots.x1},${pivots.y1} ${pivots.x2},${pivots.y2} ${x1},${y1}`
}