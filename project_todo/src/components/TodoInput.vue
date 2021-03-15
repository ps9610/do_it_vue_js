<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" placeholder="Type what you have to do"
        v-on:keyup.enter="addTodo"> <!-- keyup.enter = 키보드로 엔터누르면 addTodo 실행 -->
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fas fa-plus" aria-hidden="true"></i> <!-- aria-hidden="true" = 단순 장식 컨텐츠에 사용하는 컨텐츠 숨김속성 -->
        </span>

        <modal v-if="showModal" @close="showModal=false">
            <h3 slot="header">경고</h3> <!-- 모달 헤더 -->
            <span slot="footer" @click="showModal=false">할 일을 입력하세요. <!-- 모달 푸터 -->
                <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
            </span>
        </modal>
    </div>
</template>

<script>
import Modal from "./common/Modal.vue"

export default{
    props : ["propsdata"],

    data() { // data : function(){} | vue 컴포넌트에서 무언가를 return해주기 위해 미리 정의되어있는 속성 data를 사용
        return{
            newTodoItem : "",
            showModal : false //모달 동작하기 위한 플래그 값
        }
    },
    methods : {
        addTodo(){
            //console.log(this.newTodoItem);
            //예외코드 넣기
            if(this.newTodoItem !== ""){ // 만약 newTodoItem이 공백이 아니라면 = 입력 값이 있다면 
                //텍스트 입력 && 좌우 공백 지우기
                const value = this.newTodoItem && this.newTodoItem.trim(); //trim() : 좌우공백을 없애준다
                //로컬스토리지에 저장
                //localStorage.setItem(value, value);를 밑의 코드로 바꿔준것뿐
                this.$emit("addTodo", value);// value = 이벤트 전달시 할일텍스트 값
                this.clearInput(); //clearInput() = input box text 초기화하는 함수
            } else{
                this.showModal = !this.showModal; //텍스트 미입력시 동작하는 모달
            }
        },
        clearInput(){
        this.newTodoItem = "";
        }
    },
    components : {
        Modal : Modal //모달 컴포넌트 등록
    }
}
</script>

<style scoped>
    .inputBox {background:#fff;height:50px;line-height:50px;border-radius:5px;}
    .inputBox input{display:inline-block;border:none;}
    .inputBox input:focus{outline:none;border:none;}
    .inputBox span.addContainer {display:block;width:3rem;border-radius:0 5px 5px 0;float:right;background:linear-gradient(to right,#dbd,#bbd);}
    .inputBox .addContainer .addBtn {color:#fff;vertical-align:middle}

</style>