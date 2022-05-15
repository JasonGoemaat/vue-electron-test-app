<template>
  <ViewFile/>
</template>

<script>
import ViewFile from './components/ViewFile'

export default {
  name: 'App',
  components: {
    ViewFile
  }
}
</script>

<style>
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
