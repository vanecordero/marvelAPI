<script setup>
import { ref, watchEffect } from "vue";
import dic from "@/utils/dictionary.js";
import {useRouter} from 'vue-router'

const router = useRouter();


const props = defineProps({
  info: Object,
});
const isLoad = ref(false);
const card = ref(null);
watchEffect(() => {    
  if (isLoad.value) {
   card.value.style.borderColor = dic.colorsType[props.info.type];
  }
});
function handleClick(characterId){
    router.push( {"name":"character","params":{id: characterId}}) 
}
</script>

<template>

<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
       <img :src="info.src" :alt="info.name"   />
    </div>
    <div class="flip-card-back">
       <p class="card__name">{{ info.name }}</p>

       <p class="card__details-description">{{ info.description }}</p>
      <p class="card__name">{{ info.modified }}</p>
      <button @click="handleClick(info.id)">Ver detalles</button>
    </div>
  </div>
</div>
  <!-- <div class="card" ref="card">
    <div class="card__img">
      <img :src="info.src" :alt="info.name"   />
    </div>
    <div class="card__details">
      <p class="card__name">{{ info.name }}</p>
      <p class="card__details-description">{{ info.description }}</p>
      <p class="card__name">{{ info.modified }}</p>
  <button @click="handleClick(info.id)">Ver detalles</button>
    </div>

  </div> -->
</template>

<style>
/* .card {
  margin: 10px;
  width: 90%;
  height: 150px;
  text-align: center;
  box-shadow: 1px 1px 5px #c3c3c3;
  transition: border 600ms;
  display: grid;
  grid-template-columns: 40% 60%;
}

.card__img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__details-description{
  -webkit-line-clamp: 3;
    display: -webkit-box;
    line-height: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
} */

.flip-card {
  background-color: transparent;
  width: 300px;
  height: 500px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}
.flip-card-front img{
  width: 100%;
  height: 100%;
    object-fit: cover;
}
.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}

@media (min-width: 1024px) {

}
</style>