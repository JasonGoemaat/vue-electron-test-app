Starting:

```
Opened git-bash prompt in windows terminal
cd /d/git
mkdir vue
cd vue
yarn global add @vue/cli
yarn global add electron
vue create test-app
// here I selected the default Vue 3 config and yarn as package manager
cd news-app
```


And adding `electron-builder` (chose most recent version 13.0):

```
vue add electron-builder
```

Now I can serve the electron app:

```
yarn electron:serve
```
