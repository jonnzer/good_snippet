// 创建Dom树的能力
function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
}

// render能力
Element.prototype.render = function () {
    var el = document.createElement(this.tagName) // 创建标签元素
    var props = this.props

    for (var propKey in props) { // 给生成的元素设置属性
        var propValue = props[propKey]
        el.setAttribute(propKey, propValue)
    }

    var children = this.children || []
    children.forEach((child) => {
        var childEl = child instanceof Element
            ? child.render()
            : document.createTextNode(child)
        el.appendChild(childEl)
    })
    return el
}

module.exports = function (tagName, props, children) {
    return new Element(tagName, props, children)
}
