# Electron IPC - Preload

To get electron preload to work I had to do a few things all together,
many sites I foudn searching did not have this.  How they work still
doesn't make intuitive sense to me.  It seems like the running app
would be using the src directory when that doesn't exist in the dist, 
but whatever.

From [this page](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#examples)

1. Create `src/preload.js`
2. Change `vue.config.js` to add options to `electronBuilder`
3. Change `src/background.js` like you would for a normal electron app

## 1. src/preload.js

I created this simple file for testing:

* The electron window does pop up the alert
* The log shows up int he electron window's console
* The local file `C:\t\electron.txt` is created

```js
alert('preload.js!');
console.log('preload.js!');
var fs = require('fs');
console.log(fs);
fs.writeFileSync('c:\\t\\electron.txt', 'Hello, world!', { encoding: 'utf-8'});
```

## 2. vue.config.js

I added the `pluginOptions`

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

## 3. src/background.js

Added `preload` to the `webPreferences`

```js
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
```