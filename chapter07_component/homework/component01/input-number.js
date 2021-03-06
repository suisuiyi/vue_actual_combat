function isValueNumber(value) {
    return (/(^-? [0-9] + \.{1}\d+$)|(^-? [1-9][0-9]*$) | (^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number"> \
                <input \
                        type="text" \
                        :value="currentValue" \
                        @change="handleChange" > \
                <button \
                        @click="handleDown"\
                        :disable = "currentValue <= min" > -</button >\
                <button \
                        @click="handleUp"\
                        :disable = "currentValue >= max" > +</button >\
        </div>',
// 定义参数的限制
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }

    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val)
        },
        value: function (val) {
            this.updateValue(val);
        }
    },

    methods: {
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        },

        handleDown: function (val) {
            if (this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },

        handleUp: function (val) {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }

            } else {
                event.target.value = this.currentValue;
            }
        }
    },

    mounted: function () {
        this.updateValue(this.value);
    }
})