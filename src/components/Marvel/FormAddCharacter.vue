
<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import CharacterCard from "./Card.vue";
import {BASE_URL, API_KEY} from '@/config/marvelAPI.js';
import Modal from '../common/Modal/Modal.vue'


const props = defineProps({
  functions: Object,
});
console.log(props.functions)
const startId = ref(null)
const limit = 10;


function parsedData(e){
  console.log("submit")
  console.log(e)
  const formData = new FormData(e.target);
  console.log(formData);
  const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
    console.log(fileInput);
    insertNewcharater(formDataObj, fileInput)
};
function handleOnFile(e) {
      const files = e.target.files
      if (!files.length) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => fileInput.value = reader.result;
}
function insertNewcharater(data, imgsrc){
   startId.value ++
  openModal.value=false;
  let newVal = {
    id:startId.value,
        name: data.name,
        description: data.description,
        src: imgsrc.value,
        modified: new Date()
  }
  console.log(newVal)
  characters.value.unshift(newVal)

console.log("props.functions", props.functions)

}

onBeforeMount(async () => {
});
onMounted(() => {
});
onUnmounted(() => {
});
</script>
<template>
        <form @submit.prevent="parsedData">
          <input name="name" placeholder="name"/>
          <input name="description" placeholder="description"/>
          <!-- <input name="urlImg" placeholder="urlImg"/> -->
           <input name="urlImg" type="file" @change="handleOnFile" placeholder="urlImg" ref="fileInput"/>
      <button type="submit">add</button>
      <button @click="functions.closeModal">close</button>
        </form>
</template>

<style>

</style>