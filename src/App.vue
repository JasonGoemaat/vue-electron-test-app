<template>
  <CounterComponent/>
  <ViewFile/>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CounterComponent from './components/CounterComponent.vue'
import ViewFile from './components/ViewFile'

export default {
  name: 'App',
  components: {
    HelloWorld,
    CounterComponent,
    ViewFile
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  border-width: 0.1em;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  color: white;
  background-color: #007bff;
}

button:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}
</style>
