<script setup>

</script>

<template>
  <teleport to="body">
    <div class="modal">
      <div>
        <slot></slot>
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