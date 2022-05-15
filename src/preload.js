/********************************************************************************
 * preload.js
 * 
 * preload.js is run on the rendering thread and has access to ipcRenderer.  We
 * use contextBridge to expose this functionality to the rest of the rendering
 * thread so we can send messages back to the main thread which can access
 * node functionality.  We can also access node functionality directly from
 * in here, but not electron objects that can only run in the main thread like
 * 'dialog'?
 */

const COLOR = 'background-color: blue; color: white; padding: 5px; border-size: 5px; border-radius: 5px;'
console.log('%cpreload.js!', COLOR);

// We can use 'fs' here
import fs from 'fs';
(() => {
  const PATH = 'C:\\t\\electron2.txt';
  if (fs.existsSync(PATH)) {
    const contents = fs.readFileSync(PATH, { encoding: 'utf-8' });
    console.log('%cfile contents:', COLOR, contents);
  } else {
    console.log(`%cfile doesn't exist:`, COLOR, PATH);
  }
})();

// Couln't make it work: https://www.electronjs.org/docs/latest/tutorial/context-isolation
// Tried: https://medium.com/swlh/how-to-safely-set-up-an-electron-app-with-vue-and-webpack-556fb491b83
// finally went to electron docs: https://www.electronjs.org/docs/latest/api/ipc-main

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
  ping: () => {
    console.log('%cpreload.js: ipc.ping() called!', COLOR);
    ipcRenderer.send('ping', 'no message')
    console.log('%cSent a "ping" message to ipcRenderer, we will see if anything happens...', COLOR);
  },
  sendAsync: (message) => {
    console.log('%csendAsync:', COLOR, message);
    ipcRenderer.send('asynchronous-message', 'ping');
  },
  sendSync: (message) => {
    console.log('%csendSync: ', COLOR, message);
    const result = ipcRenderer.sendSync('synchronous-message', 'ping');
    console.log('%csendSync result:', COLOR, result);
    return result;
  },
  on: (fn) => {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log('%cpreload.js: got asynchronous-reply:', COLOR, event, arg);
      fn(event, arg);
    });
  },
  openFile: () => {
    const results = ipcRenderer.send('open-file')
    console.log('%copenFile():', COLOR, results);
    return new Promise(res => {
      ipcRenderer.once('open-file-response', (_, arg) => {
        res(arg);
      })
    });
  },
  handleOpenFile: () => {
    return ipcRenderer.invoke('handle:open-file').then((results = []) => {
      console.log('%chandleOpenFile():', COLOR, results);
    });
  }
});

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
//ipcRenderer.send('asynchronous-message', 'ping')

// const validChannels = ['READ_FILE', 'WRITE_FILE'];
// contextBridge.exposeInMainWorld(
//   'ipc', {
//     send: (channel, data) => {
//       if (validChannels.includes(channel)) {
//         ipcRenderer.send(channel, data);
//       }
//     },
//     on: (channel, func) => {
//       if (validChannels.includes(channel)) {
//         // Strip event as it includes `sender` and is a security risk
//         ipcRenderer.on(channel, (event, ...args) => func(...args));
//       }
//     },
//   },
// );
