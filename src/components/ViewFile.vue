<template>
  <div class="column">
    <button @click="openFile()">openFile</button> &nbsp;
    <button @click="handleOpenFile()">handleOpenFile</button> &nbsp;
    <p v-if="fileInfo">{{ fileInfo.path }}</p>
    <textarea v-if="fileInfo" v-model="fileInfo.contents"></textarea>
  </div>
</template>

<script>
const COLOR = 'background-color: red; color: white; padding: 5px; border-size: 5px; border-radius: 5px;'
console.log('%cVueFile.vue!', COLOR);

export default {
  name: 'ViewFile',
  data() {
    return {
      content: "Hello, world!",
      fileInfo: null
    }
  },
  methods: {
    async openFile() {
      console.log('in openFile(), this.content is:', this.content);
      const results = await window.ipc.openFile();
      console.log('%copenFile():', COLOR, results);
      this.fileInfo = results;
    },
    async handleOpenFile() {
      const results = await window.ipc.handleOpenFile();
      console.log('%chandleOpenFile() results:', COLOR, results);
      this.fileInfo = results;
    }
  }
}
</script>

<style lang="scss" scoped>
  .column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5em;

    & > {
      margin: 0.5em;
    }

    textarea {
      width: 800px;
      height: 15em;
    }
  }
</style>