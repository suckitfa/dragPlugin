/**
 * new Drag([selector],[options])
 * selector 
 *  要拖拽的插件
 * options = {}
 *  element:拖拽中要移动的元素(默认值：按住的元素)
 *  boundary: 是否进行边界判断 元素所在容器的范围
 * 
 * 
 * 声明周期函数（钩子函数)
 * dragstart
 * dragmove
 * dragend
 */
(function() {
    // 拖拽插件
    class Drag {
        constructor(selector, options) {
                this.initParams(selector, options);
            }
            // 参数初始化，竟可能将信息挂载到实例上
        initParams(selector, options = {}) {
            this._selector = document.querySelector(selector);
        }
    }
    window.Drag = Drag;
})();