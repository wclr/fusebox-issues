# [Fusebox module import issue](https://github.com/fuse-box/fuse-box/issues/541)

![fuse-issues-xstream-extra-import](https://user-images.githubusercontent.com/736697/28611860-b1e2fb90-7206-11e7-89d3-710bc5b0b7fe.gif)

1) `npm install`/`yarn`
2) `npm run watch`
3) load `http://localhost:3000/`
4) Uncomment 2 lines with `concat`. Save files. App should HOT reload.
```
app.js:58 TypeError: Cannot read property 'default' of undefined
...
app.js:2396 xstream/extra/concat does not provide a module
```
