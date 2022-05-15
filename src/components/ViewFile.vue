<template>
  <button @click="openFile()">openFile</button> &nbsp;
  <button @click="handleOpenFile()">handleOpenFile</button> &nbsp;
  <button @click="test()">Test</button>
  <br/>
  <button @click="sendAsync()">Async</button> &nbsp;
  <button @click="sendSync()">Sync</button>
  <br/>
  <button @click="getFileFromUser()">Get File From User</button>
  <br/>
  <textarea v-model="content"></textarea>
</template>

<script>
const COLOR = 'background-color: red; color: white; padding: 5px; border-size: 5px; border-radius: 5px;'
console.log('%cVueFile.vue!', COLOR);

export default {
  name: 'ViewFile',
  data() {
    return {
      content: "Hello, world!"
    }
  },
  mounted() {
    // window.ipc.on('pong', (payload) => {
    //   console.log('VueFile.vue - mounted() - ipc.on "pong":');
    //   console.log(payload);
    // })
    console.log('%cwindow.ipc is:', COLOR, window.ipc);
    window.ipc.on((event, arg) => {
      console.log('%cVueFile.vue - window.ipc.on!', COLOR);
      console.log({event, arg});
    });
  },
  methods: {
    openFile: () => {
      console.log('%cYou clicked openFile()!', COLOR);
      const results = window.ipc.openFile();
      console.log('%copen() results:', COLOR, results);
      results.then(files => {
      console.log('%copen() results.then(files):', COLOR, files);
      })
    },
    handleOpenFile: () => {
      console.log('%cYou clicked hanldeOpenFile()!', COLOR);
      const results = window.ipc.handleOpenFile();
      console.log('%chandleOpenFile() results:', COLOR, results);
    },
    test: () => {
      console.log('%cYou clicked the test button!', COLOR);
      var result = window.ipc.ping();
      console.log('%csent ping, result:', COLOR, result);
    },
    sendAsync: () => {
      console.log('%cYou clicked the Async button!', COLOR);
      window.ipc.sendAsync('pingAsync');
    },
    sendSync: () => {
      console.log('%cYou clicked the Sync button!', COLOR);
      const result = window.ipc.sendAsync('pingSync');
      console.log('%cresult of sending "pingSync" using window.ipc.sendAsync:', COLOR, result);
    },
    getFileFromUser: () => {
      console.log('%cYou clicked the Sync button!', COLOR);
      const result = window.ipc.getFileFromUser();
      console.log('%cresult of getFileFromUser():', COLOR, result);
    }
  }
}
</script>
