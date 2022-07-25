
<template>
  <h2 class="app__title">The characters</h2>
  <button @click="openModal = true">Add new character</button>
  <Modal v-if="openModal">
  <FormAddCharacter :functions="{
    closeModal:closeModal,
    handleSubmit:insertNewcharater
  }"/>
  </Modal>
  <!-- <teleport to="body">
    <div class="modal" v-if="openModal">
      <div>
        <p>Agregar cherater</p>
        <form @submit.prevent="handleSubmit">
          <input name="name" placeholder="name"/>
          <input name="description" placeholder="description"/>
           <input name="urlImg" type="file" @change="handleOnFile" placeholder="urlImg" ref="fileInput"/>
      <button type="submit">add</button>
      <button @click="openModal = false">close</button>
        </form>
      </div>
    </div>
  </teleport>
   -->



  <div v-if="isLoading && page ===0">
      loading...
    </div>
  <div v-else class="app__view">    
    <CharacterCard v-for="character in characters" :key="character.name" :info="character" />
  </div>
  <div class="app__container">
    <div class="spinner" v-if="isLoading"></div>
    <p>Dizq el boton</p>
    <a href="" class="click__button app__more" v-if="hasMore && !isLoading" @click.prevent="moreData">Ver más</a>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import CharacterCard from "./Card.vue";
import {BASE_URL, API_KEY} from '@/config/marvelAPI.js';
import Modal from '../common/Modal/Modal.vue';
import FormAddCharacter from "./FormAddCharacter.vue";

const startId = ref(null)
const limit = 10;
const openModal=ref(false);
const fileInput= ref(null);
let characters = ref(Array.from({ length: 20 }, (v, i) => ({ id: "", name: "", src: "", description: "" , modified:""})));
let page = ref(0);
let hasMore = ref(false);
let isLoading = ref(false);
const getSkip = (_page) => _page * limit;

async function fetchCharacters(_page) {
  isLoading.value = true;
  const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${getSkip(_page)}&${API_KEY}`);
  const charactersRaw = await response.json();
 
   if(!startId.value) startId.value = charactersRaw.data.total;
  hasMore.value = charactersRaw.data.total > getSkip(_page);
    console.log(charactersRaw.data.total);

  const result = charactersRaw.data.results.map((character) => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        src: character.thumbnail.path +'.' +character.thumbnail.extension,
        modified: character.modified,
      };
    })
    console.log(result)
  isLoading.value = false;
  return result;
};
async function moreData() {
  page.value++;
  console.log(page)
  const newCharacters = await fetchCharacters(page.value);
  characters.value = [...characters.value, ...newCharacters];
};
function scrolling({ target }) {
  const { scrollingElement } = target;
  const gap = 60;
  if (scrollingElement.scrollTop + scrollingElement.clientHeight + gap >= scrollingElement.scrollHeight) {
    const button = document.querySelector(".click__button");
    button?.click();
  }
};
/*
function handleSubmit(e){
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
}*/
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
}
function closeModal(){openModal.value = false}
onBeforeMount(async () => {
  characters.value = await fetchCharacters(page.value);
});
onMounted(() => {
  window.addEventListener("scroll", scrolling);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrolling);
});
</script>


<style>
.app__view {
  display: flex;
    flex-direction: column;
    align-items: center;
}

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
</style>