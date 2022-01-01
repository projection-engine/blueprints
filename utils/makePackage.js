import Response from "../templates/Response";

export default function makePackage(hook) {
    hook.compile()
    return {
        nodes: hook.nodes.map(n => {
            return {...n, instanceOf: n.constructor.name}
        }),
        links: hook.links.map(l => {
            return {...l}
        }),
        responses:  hook.nodes.filter(n => {
            return (n instanceof Response)
        }).map(n => {
            return {...n}
        })
    }
}