<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput> <!-- 이벤트 전달하기 위한 v-on 디렉티브 속성 -->
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"></TodoList> 
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
  import TodoHeader from "./components/TodoHeader.vue"
  import TodoInput from "./components/TodoInput.vue"
  import TodoList from "./components/TodoList.vue"
  import TodoFooter from "./components/TodoFooter.vue"

  export default {
    data(){
      return {
        todoItems : [] //로컬 스토리지와 하위 컴포넌트들을 잇는 중간 다리 역할
      }
    },
    methods : {
      addTodo(todoItem){ //인자 todoItem = TodoInput 컴포넌트에서 올려 보낸 할일텍스트 값
        //로컬 스토리지에 하위 컴포넌트에서 받은 이벤트 데이터 추가
        localStorage.setItem(todoItem, todoItem); //인자로 받은 값을 로컬스토리지에 저장
        this.todoItems.push(todoItem); //app컴포넌트의 데이터속성에도 저장
      },
      clearAll(){
        localStorage.clear(); //로컬스토리지 전체 삭제
        this.todoItems = []; // todoItem 초기화
      },
      removeTodo(todoItem, index){
        localStorage.removeItem(todoItem);
        this.todoItems.splice(index, 1);
      }
    },
    created(){ //뷰 인스턴스가 생성되자마자 바로 뷰 데이터에 접근하게 함
        if(localStorage.length > 0){//로컬 스토리지 길이가 0보다 크다면 = 로컬 스토리지 안에 뭐라도 있다면
            for(var i=0;i<localStorage.length;i++){ //반복해라
                this.todoItems.push(localStorage.key(i)); // 이 i번째 key를 배열 todoItems의 끝 요소에 하나씩 추가하는 것을 
                    //localStorage.key(i) = localStorage의 i번째 key이름 반환
                    //push(localStorage.key(i)) = i번째 key를 배열의 끝 요소에 하나씩 추가함
            }
        }
    },
    components : {
      "TodoHeader" : TodoHeader,
      "TodoInput" : TodoInput,
      "TodoList" : TodoList,
      "TodoFooter" : TodoFooter
    }
  }
</script>

<style>
  body {text-align:center;background:#f6f6f8;}
  input {border-style:groove;width:200px;}
  button {border-style:groove;}
  .shadow {box-shadow:5px 10px 10px rgba(0, 0, 0, .03)};
</style>
