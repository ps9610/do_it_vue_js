new Vue({
    el: "#app",

    data : {
        message : "Hello Vue.js",
        text : "두잇 Vue.js",
        uid : 20,
        flag : true/* false */
    },

    methods : {
        clickBtn(){
            console.log("hi");
        },

        clickBtn2(event){
            console.log(event);
        }
    }
})