<template>
    <!-- 한 번에 모두 제거하기 -->
    <div class="clearAllContainer">
        <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
</template>

<script>
export default{
    methods : {
        clearTodo(){
            //localStorage.clear(); //removeItem이랑은 다름, 전체를 삭제 -> app 컴포넌트로 옮겨짐
            this.$emit("removeAll");
        }
    }
}
</script>

<style>
    .clearAllContainer {width:8.5rem;height:50px;line-height:50px;background:#fff;border-radius:5px;margin:0 auto;}
    .clearAllContainer .clearAllBtn {display:block;color:#dbb9aa;}
</style>