So for the initial app, we appear to have these:

* `public` - directory with files to serve, including `index.html` and `favicon.ico`
* `src/assets` - directory with public assets
  * Why separate from `public`?
  * Sample usage in `src/App.view`, relative path to `logo.png`:
    ```html
    <img alt="Vue logo" src="./assets/logo.png">
    ```
* `src/components` - location for components like `HelloWorld.vue`
* `src/App.vue` - main component, loaded from main.js
* `src/background.js` - electron file
* `src/main.js` - bootstrap
  * Basically imports `App.vue` and calls `createApp(App).mount('#app')`
