export default function checkType(nodeType, inputs = []) {
    let valid = true
    for (let i = 0; i < inputs.length; i++) {
        valid = valid && (!inputs[i].accept || inputs[i].accept.includes(nodeType))
    }

    return valid
}