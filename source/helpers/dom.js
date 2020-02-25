// Get DOM
const _getDom = (s) => {
    
    var nodeList = !this.tagName || this.length ? window.document.querySelectorAll(s) : this.querySelectorAll(s); 

    return nodeList.length > 1 || !nodeList.length ? nodeList : nodeList[0];
    
}

Element.prototype.find = _getDom;

module.exports.$ = _getDom;