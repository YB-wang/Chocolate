export function treeToList(tree) {
    tree.tree(() => {
        tree.reduce((acc, cur) => {
            if (!cur.children) {
                acc.push(cur)
            } else {
                const subList=arguments.callee(cur.children)
                acc.push(item,...subList)
            }
        }, [])
    })
}