let tree = [{
    id: 1,
    name: 'xx',
    children: [
        {
            id: 11,
            name: '1xx',
            children: [
                {
                    id: 111,
                    name: '11xx'
                }
            ]
        },
        {
            id: 12,
            name: '12x'
        }
    ]
}, {
    id: 2,
    name: 'xx',
    children: [
        {
            id: 21,
            name: '1xx',
            children: [
                {
                    id: 211,
                    name: '11xx'
                }
            ]
        },
        {
            id: 22,
            name: '12x'
        }
    ]
}]

// {
//     '1': { name: 'xx', children: [ 11, 12 ] },
//     '2': { name: 'xx', children: [ 21, 22 ] },
//     '11': { name: '1xx', parent: 1, children: [ 111 ] },
//     '12': { name: '12x', parent: 1 },
//     '21': { name: '1xx', parent: 2, children: [ 211 ] },
//     '22': { name: '12x', parent: 2 },
//     '111': { name: '11xx', parent: 11 },
//     '211': { name: '11xx', parent: 21 }
//   }
function childrenStoArr(arr) {
    let res = arr.map((node) => { return node.id })
    return res
}
function handleNode(node, root, parent = NaN) {
    if (!root.hasOwnProperty(`${node.id}`)) {
        root[node.id] = {}
    }
    if (parent) {
        root[node.id]['parent'] = parent
    }
    if (!root[node.id].hasOwnProperty('name')) {
        root[node.id]['name'] = node.name
    }
    if (node?.children) {
        root[node.id]['children'] = childrenStoArr(node.children)
    }
    if (node.children) {
        node.children.forEach(item => {
            handleNode(item, root, item.id)
        })
    }
}
let res = tree.reduce((pre, cur) => {
    handleNode(cur, pre)
    return pre
}, {})

console.log(res)