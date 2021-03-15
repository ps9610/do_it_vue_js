<template>
    <section>
        <transition-group name="list" tag="ul"> <!-- ul태그 제거한대신 ul태그역할 함 -->
            <!-- li v-for="todoItem in todoItems" class="shadow" 를 👇로 바꾼이유
                : todoItem = text값, index = 배열 인덱스,  :key=""(v-bind="key") -->
            <!-- li v-for="(todoItem, index) in todoItems" :key="todoItem" class="shadow" -->
            <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow"> <!-- v-for 디렉티브 반복대상을 propsdata로 변경, 
                                                                                        App컴포넌트 todoItems의 데이터갯수만큼 목록아이템 생성 -->
                <i class="checkBtn fas fa-check" aria-hidden="true"></i>
                {{ todoItem }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
                    <i class="far fa-trash-alt" aria-hidden="true"></i>
                </span>
            </li>
        </transition-group>
    </section>
</template>

<script>
export default{
    props : ["propsdata"],
    //이제 할일데이터는 모두 app 컴포넌트에서 관리하기 때문에 data 삭제
    //local storage data -> vue data에 저장
    /* data(){
        return{
            todoItems : [] //todoItems 선언 : local storage 데이터를 담을 빈 배열
                //객체 아니고 배열인 이유 = li 태그의 v-for 목록 렌더링에서 쓸라고
        }
    }, */
    //app 컴포넌트로 옮김
    /* created(){ //뷰 인스턴스가 생성되자마자 바로 뷰 데이터에 접근하게 함
        if(localStorage.length > 0){//로컬 스토리지 길이가 0보다 크다면 = 로컬 스토리지 안에 뭐라도 있다면
            for(var i=0;i<localStorage.length;i++){ //반복해라
                this.todoItems.push(localStorage.key(i)); // 이 i번째 key를 배열 todoItems의 끝 요소에 하나씩 추가하는 것을 
                    //localStorage.key(i) = localStorage의 i번째 key이름 반환
                    //push(localStorage.key(i)) = i번째 key를 배열의 끝 요소에 하나씩 추가함
            }
        }
    }, */
    methods : {
        removeTodo(todoItem, index){
            //console.log(todoItem, index);
            localStorage.removeItem(todoItem);
            //this.todoItems.splice(index, 1) //splice() = 인자(여기선 index)를 이용하여 해당 인덱스에서 1만큼(1개씩) 삭제
            this.$emit("removeTodo", todoItem, index);
        }
    }
}
</script>

<style scoped>
    section {}
    section ul {list-style:none;padding-left:0px;margin-top:0;text-align:center;}
    section .list-enter-active, section .list-leave-active {transition:all 1s;}
    section .list-enter, section .list-leave-to {opacity:0;transform:translateY(30px);}
    section ul li {display:flex;min-height:50px;height:50px;line-height:50px;margin:.5rem 0;padding:0 .9rem;background:#fff;border-radius:5px;}
    section ul li .checkBtn {line-height:45px;color:#dbd;margin-right:5px;}
    section ul li .removeBtn {margin-left:auto;color:#bbd;}
</style>