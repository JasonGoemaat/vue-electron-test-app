/********************************************************************************
 * preload.js
 * 
 * preload.js is run on the rendering thread and has access to ipcRenderer.  We
 * use contextBridge to expose this functionality to the rest of the rendering
 * thread so we can send messages back to the main thread which can access
 * node functionality.  We can also access node functionality directly from
 * in here, but not electron objects that can only run in the main thread like
 * 'dialog'.  For instance we could use fs and read the file here, but not
 * display the open file dialog
 */

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
