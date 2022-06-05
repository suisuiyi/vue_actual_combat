
var app = new Vue({
    el: '#app',
    data: {
        show: true
    },
    methods: {
        handleClose: function() {
            this.show = false;
        }
    }
})