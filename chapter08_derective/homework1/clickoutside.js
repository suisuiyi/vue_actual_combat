Vue.directive('clickoutside', {
    //自定义指令
    // 用于判断元素A是否包含了元素B， 包含返回true, 不包含返回false
    // 如果要在document上绑定click事件， 所以在bind钩子内声明了一个函数 documentHandler, 并把它作为一个句柄绑定在document的click事件
    // documentHandler 做了两个判断，第一个是判断点击区域是否在指令所在的元素内部，如果是就跳出函数，不往下继续执行。

    bind: function(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false
            }

            if (binding.expression) {
                binding.value(e)
            }
        }
        // js 写法
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);

    },
    unbind: function (el, binding) {
            document.removeEventListener('click', el.__vueClickOutside__);
            delete el.__vueClickOutside__;
    }
    
});