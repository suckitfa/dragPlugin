/**
 * new Drag([selector],[options])
 * selector 
 *  要拖拽的插件
 * options = {}
 *        element:拖拽中要移动的元素(默认值：按住的元素)
 *        boundary: 是否进行边界判断 元素所在容器的范围
 *  声明周期函数（钩子函数)
 *       dragstart
 *      dragmove
 *      dragend
 */
(function() {
    // 拖拽插件
    class Drag {
        constructor(selector, options) {
                this.initParams(selector, options);
                this._selector.addEventListener('mousedown', this.down.bind(this));
            }
            // 参数初始化，竟可能将信息挂载到实例上
        initParams(selector, options = {}) {
            this._selector = document.querySelector(selector);
            let defaultParams = {
                element: this._selector,
                boundary: true,
                dragstart: null,
                dragmove: null,
                dragend: null
            };
            defaultParams = Object.assign(defaultParams, options);
            // 将配置信息，挂载到当前类的实例
            Drag.each(defaultParams, (val, key) => {
                this[`_${key}`] = val;
            });
        };
        // 实现拖拽效果
        down(ev) {
            let {
                _element
            } = this;
            this.startX = ev.pageX;
            this.startY = ev.pageY;
            this.startL = Drag.queryCss(_element, 'left');
            this.startT = Drag.queryCss(_element, 'top');
            this._move = this.move.bind(this);
            this._up = this.up.bind(this);
            document.addEventListener('mousemove', this._move);
            document.addEventListener('mouseup', this._up);
            // 钩子函数处理
            this._dragstart && this._dragstart(this);
        };
        move(ev) {
            let {
                _element,
                _boundary,
                startX,
                startY,
                startL,
                startT
            } = this;

            let curL = ev.pageX - startX + startL,
                curT = ev.pageY - startY + startT;

            // 边界判断
            if (_boundary) {
                let parent = _element.parentNode,
                    minL = 0,
                    minT = 0,
                    maxL = parent.offsetWidth - _element.offsetWidth,
                    maxT = parent.offsetHeight - _element.offsetHeight;
                curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
                curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
            }
            _element.style.left = curL + "px";
            _element.style.top = curT + "px";
            // 钩子函数处理
            this._dragmove && this._dragmove(this, curL, curT, ev);
        };
        up(ev) {
            document.removeEventListener('mousemove', this._move);
            document.removeEventListener('mouseup', this._up);
            // 钩子函数的处理
            this._dragend && this._dragend(this, ev);
        };
        // 设置工具类方法(当做类的私有属性)
        static each(arr, callbackFn) {
            // 类数组 || 数组
            if ('length' in arr) {
                for (let i = 0; i < arr.length; ++i) {
                    callbackFn && callbackFn(arr[i], i);
                }
                return;
            };
            // 普通对象
            for (let key in arr) {
                if (!arr.hasOwnProperty(key)) {
                    break;
                }
                callbackFn && callbackFn(arr[key], key);
            };
        };
        // 获取样式
        static queryCss(curEle, attr) {
            return parseFloat(window.getComputedStyle(curEle, null)[attr]);
        }
    }
    window.Drag = Drag;
})();