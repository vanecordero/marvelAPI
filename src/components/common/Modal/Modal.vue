<script setup>
/*
const props = defineProps({
  functions: Object,
});
console.log(props.functions)*/
</script>

<template>
  <teleport to="body">
    <div class="modal">
      <div>
        <slot></slot>
        <!-- <p>Agregar cherater</p>
        <form @submit.prevent="functions.handleSubmit">
          <input name="name" placeholder="name"/>
          <input name="description" placeholder="description"/>
           <input name="urlImg" type="file" @change="functions.handleOnFile" placeholder="urlImg" ref="fileInput"/>
      <button type="submit">add</button>
      <button @click="functions.closeModal">close</button>
        </form>-->
      </div> 
    </div>
  </teleport>
  
</template>

<style>
.modal{
   position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.555);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal div{
  background-color: #fff;
  padding: 50px;
  border-radius: 10px;
}

@media (min-width: 1024px) {

}
</style>