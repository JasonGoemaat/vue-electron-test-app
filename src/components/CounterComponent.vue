<template>
  <div class="centered-list">
    <h1>Counter: {{ counter }}</h1>
    <button @click="counter++">Increment</button>
    <button @click="increment">Increment AnotherWay</button>
  </div>
</template>

<script>
export default {
  name: "HelloComponent",
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment() {
      this.counter++;
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

  div.centered-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.centered-list > * {
    margin: 0.25em;
  }
</style>
