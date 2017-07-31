import { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin, RawPlugin } from 'fuse-box'
import { removeSync } from 'fs-extra'
import { Plugin } from 'fuse-box/dist/typings/core/WorkFlowContext'

removeSync(__dirname + '/dist')
removeSync(__dirname + '/.fusebox')

let fuse, app, isProduction = false;


const LPPlugin = (): Plugin => {
  return {
    test: /lp(\\|\/)index\.ts/,
    transform: (file) => {
      console.log('LPPlugin transform file', file.absPath)
      file.contents = `
        export default
      `
    },
    // onTypescriptTransform: (file) => {

    //   console.log('LPPlugin onTypescriptTransform file', file.absPath)
    //   file.contents += "\n console.log('TS transform, I am here')";
    // }
  }
}

Sparky.task("config", () => {
  fuse = FuseBox.init({
    experimentalFeatures: true,
    homeDir: "src",
    output: "dist/$name$hash.js",
    hash: isProduction,
    plugins: [
      RawPlugin(['.txt']),
      // LPPlugin(),
      WebIndexPlugin({
        path: '/dist'
      }),
      isProduction && QuantumPlugin({
        target: "universal",
        bakeApiIntoBundle: "app",
        uglify: true,
        extendServerImport: true
      })
    ]
  })
  fuse.dev({
    root: '.'
  })
  app = fuse.bundle("app")    
    // .splitConfig({ browser: "/dist/", server : "dist/", dest: "bundles/" })  
    .split('sub-module/**', 'sub > sub-module/index.ts')
    .split('data/**', 'targettxt > data/target.txt')
    .split('lp/ru**', 'app-ru-lp > lp/ru.ts')
    .split('lp/en**', 'app-en-lp > lp/en.ts')
    .split('sub-module/lp/ru**', 'sub-ru-lp > sub-module/**/lp/ru.ts')
    .split('sub-module/lp/en**', 'sub-en-lp > sub-module/**/lp/en.ts')    
    .instructions("> [index.ts] + [sub-module/index.ts] + [data/target.txt] + [**/lp/*.ts]")
    .watch()
    .hmr()
    
})

Sparky.task("clean", () => {
  return Sparky.src("dist/").clean("dist/");
});

Sparky.task("default", ["clean", "config"], () => fuse.run());
Sparky.task("set-production", () => {
  isProduction = true;
});
Sparky.task("dist", ["clean", "set-production", "config"], () => {
  fuse.run()
});