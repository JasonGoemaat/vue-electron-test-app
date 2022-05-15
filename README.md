# test-app

This is a quick test app showing how to use electron and vue
to create a desktop app.  It basically opens a dialog for you 
to select a file and displays the path and contents.

To run it if you have yarn:

  yarn install
  yarn electron:serve

To create the app from scratch, see the 'Starting' at the bottom.

## IPC

For security purposes, electron limits access to node and electron
features from web content views.  This is explained in their doc on 
[context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation).

Basically electron has a main thread that runs in the background
that manages windows and app lifecycle and a render thread that
works with the pages you create.   The scripts that run on the pages
you view run on the render thread and have restricted access.  To
gain more access safely we can create a preload script that has
more access and only expose a limited api to those web scripts.

### vue.config.js

From the base we get by adding `electron-builder` to our view app, we
need to edit `vue.config.js` to add `pluginOptions.electronBuilder.preload`
so it will run our preload script.

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js'
    }
  }
});
```

### src/preload.js

This script is special and has access to electron and node apis.
We use `contextBridge` to expose our own apis that use
`ipcRenderer` to talk to the main thread which we need to do
to open a dialog.

`ipcRenderer.send()` will send a message on a channel to the
main thread.  `ipcRenderer.once()` listens for a single message
on the specified channel.   `ipcRenderer.invoke()` does basically
the same thing as those combined, returning a promise that
resolves with the response from the main thread directly.


```js
const { contextBridge, ipcRenderer } = require('electron');

// contextBridge lets us define a varible ('window.ipc' here) which
// can include functions that call ipcRenderer functions.
contextBridge.exposeInMainWorld('ipc', {
  openFile: () => {
    // this just sends a message, we need to listen for a response message
    ipcRenderer.send('open-file')

    // here we return a promise we will resolve when we get the message
    return new Promise(resolve => {
      // listen of only one response message with once()
      ipcRenderer.once('open-file-response', (_, fileInfo) => {
        // '_' is a placeholder for the 'event' which we don't care about,
        // fileInfo is the response which we resolve the promise with
        resolve(fileInfo);
      })
    });
  },
  handleOpenFile: () => {
    // invoke returns a promise with the results
    return ipcRenderer.invoke('handle-open-file');
  }
});
```

### background.js

This runs in the electron main thread and handles windows and
lifecycle events.   First we need to define the 
[preload script](https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts)
that will run in the render context and will have more privileges:

```js
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js') // added this
    }
  })
```

We also add two listeners here for the two messages we send
in `preload.js`.  We use the window we create as an argument to
`dialog.showOpenDialog()` so that it runs as a modal dialog:

```js
  //--------------------------------------------------------------------------------
  // Here we listen to and respond to events from the render thread
  //--------------------------------------------------------------------------------

  // this listens for an event (message) sent via ipcRenderer.send()
  // and replies using event.reply() to send an 'event' (message) back
  ipcMain.on('open-file', (event) => {
    const filePath = dialog.showOpenDialogSync(win)[0];
    const contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
    event.reply('open-file-response', {path: filePath, contents});
  });

  // this is called using ipcRenderer.invoke() which returns a promise
  // that will contain our results
  ipcMain.handle('handle-open-file', () => {
    const filePath = dialog.showOpenDialogSync(win)[0];
    const contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
    return {path: filePath, contents};
  });
```

`ipcMain.on(channel, callback)` listens for a message on the specified
channel.   Here we use `event.reply` to send a message back with
the file path and contents on another channel.

`ipcMain.handle(channel, callback)` also listens for a message on the
specified channel, but the return value will be the value the
promise resolves to in the preload script.

## Starting:

```
Opened git-bash prompt in windows terminal
cd /d/git
mkdir vue
cd vue
yarn global add @vue/cli
yarn global add electron
vue create test-app
// here I selected the default Vue 3 config and yarn as package manager
cd test-app
```


And adding `electron-builder` (chose most recent version 13.0):

```
vue add electron-builder
```

Now I can serve the electron app:

```
yarn electron:serve
```
