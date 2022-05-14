<template>
  <button @click="open()">Open File</button>
  <br/>
  <textarea v-model="content"></textarea>
</template>

<script>
export default {
  name: 'ViewFile',
  data() {
    return {
      content: "Hello, world!"
    }
  },
  open() {
    console.log('You clicked open()!');
  }
}
</script>
