<template>
  <div class="centered-list">
    <h1>Counter: {{ counter }}</h1>
    <button @click="counter++">Increment</button>
  </div>
</template>

<script>
export default {
  name: "HelloComponent",
  data() {
    return {
      counter: 0
    }
  }
}
</script>

<style scoped>
  h1 {
    border: 20px transparent;
    border-radius: 15px;
    background-color: bisque;
    padding: 0.5em;
    width: 320px;
  }
  button {
    font-weight: bold;
    font-size: 1.4em;
    border-radius: 10px;
    background-color: gold;
    padding: 0.5em 1.5em;
    cursor: pointer;
  }

  button:hover {
    background-color: black;
    color: gold;
  }

  div.centered-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.centered-list > * {
    margin: 0.25em;
  }
</style>
