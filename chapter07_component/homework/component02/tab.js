Vue.component('tabs', {
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
           <div\
             :class="tabCls(item)" \
             v-for="(item, index) in navList" \
             @click="handleChange(index)"> \
            {{ item.label }} \
        </div> \
    </div> \
    <div class="tabs-content">\
        <slot></slot>\
    </div>\
</div>',

    data: function () {
        return {
            // 因为不能修改value， 所以复制一份自己维护
            currentValue: this.value,
            // 用于渲染tabs的标题
            navList: []
        }
    },

    props: {
        value: {
            // 这里的value 是为了可以使用v-model
            type: [String, Number]
        }
    },

    methods: {

        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currenValue
                }
            ]
        },
        getTabs() {
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function (itme) {
                return itme.$options.name === 'pane';
            });
        },

        updateNav() {
            this.navList = [];
            // 设置对this的引用， 在function回调里，this指向的并不是Vue实例
            var _this = this;

            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果没有给pane设置name, 默认设置它的索引

                if (!pane.name) pane.name = index;
                // 设置当前选中的tab索引， 在后面介绍
                if (index === 0) {
                    if (!_this.currenValue) {
                        _this.currenValue = pane.name || index;
                    }
                }
            });

            this.updateStatus();

        },

        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;

            // 显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currenValue;
            })
        },

        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currenValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
            // 切换tab的时候控制内容的显示与隐藏
            this.updateStatus();
        }
    },

    watch: {
        value: function (val) {
            this.currenValue = val;
        },

        currenValue: function () {
            this.updateStatus();
        }
    }


})