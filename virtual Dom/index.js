var el = require('./element')
var ul = el('ul', { id: 'list' }, [
    el('li', { class: 'item' }, ['Item 1']),
    el('li', { class: 'item' }, ['Item 2']),
    el('li', { class: 'item' }, ['Item 3'])
])
document.body.appendChild(ul.render())


// diff 
function diff(oldTree, newTree) {
    var index = 0 // 当前节点的标志
    var patches = {} // 用来记录差异的对象
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

// 对两棵树进行深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
    // 对比oldNode和newNode的不同
    patches[index] = [...]
    diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren(oldChildren, newChirdren, index, patches) {
    var leftNode = null
    var currentNodeIndex = index
    oldChildren.forEach(function (child, i) {
        var newChild = newChirdren[i]
        currentNodeIndex = leftNode && leftNode.count
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches)
        leftNode = child
    })
}

// 定义差异类型 
var REPLACE = 0 // 替换原来的节点 比如换了标签
var REORDER = 1 // 比如换了顺序
var PROPS = 2   // 比如换了属性
var TEXT = 3    // 比如换了文本节点