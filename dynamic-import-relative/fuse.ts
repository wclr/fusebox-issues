import { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } from 'fuse-box'
import { removeSync } from 'fs-extra'

removeSync(__dirname + '/dist')
removeSync(__dirname + '/.fusebox')

let fuse, app, isProduction = false;

// Sparky.task("copy-test-file", () => {
//   return Sparky.src("target.txt").dest("dist/$name");
// });

Sparky.task("config", ["copy-test-file"], () => {
  fuse = FuseBox.init({
    experimentalFeatures: true,
    homeDir: "src",
    output: "dist/$name.js",
    hash: false,
    plugins: [
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
    .splitConfig({ browser: "/dist/", server : "dist/", dest: "bundles/" })  
    .split('sub-module/**', 'sub > sub-module/index.ts')  
    .watch()
    .hmr()
    .instructions("> [index.ts] + [sub-module/**/*.{ts}]")
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