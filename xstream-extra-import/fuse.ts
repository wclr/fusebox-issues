import { FuseBox } from 'fuse-box'
import * as express from 'express'
import { join } from 'path'
import { removeSync } from 'fs-extra'

removeSync(__dirname + '/.fusebox')

const port = process.env.PORT || 3000

const fuse = FuseBox.init({
  homeDir: 'client',
  output: 'build/app.js'
})

fuse
  .dev({
    root: '.',
    port  
  }, (server) => {
    server.httpServer.app.use(express.static(join(__dirname)));
    server.httpServer.app.get('*', function (req: any, res: any) {      
      res.sendFile(join(__dirname, 'index.html'));
    })
  })

fuse.bundle('app.js')
  .instructions(`> app.ts`)
  .hmr()
  .watch()

fuse.run()
