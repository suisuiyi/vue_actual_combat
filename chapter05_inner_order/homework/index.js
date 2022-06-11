var app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1,
                isSelect: false
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1,
                isSelect: false
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
                isSelect: false
            }
        ]

    },

    computed: {
        totalPrice: function () {
            var total = 0;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].isSelect === true) {
                    total += this.list[i].price * this.list[i].count;
                }
            }

            // return total.toString().replace(/\B(? = (\d{3})+$)/g, ', ');
            return total.toString();
        }

    },

    methods: {
        handleReduce: function (index) {
            this.list[index].count--;
        },

        handleAdd: function (index) {
            this.list[index].count++;
        },

        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
        selectAll: function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].isSelect = true
            }
        }


    }
})

