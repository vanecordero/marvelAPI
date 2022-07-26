<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/marvel">Marvel</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header{
    position: fixed;
    z-index: 1;
    margin: auto;
    width: 100%;
    background: white;
    top: 0;
    height: 50px;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin: 1rem 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}




</style>
