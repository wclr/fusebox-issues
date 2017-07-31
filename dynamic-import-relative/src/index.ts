console.log('app is here')

import('./data/target.txt' as string).then(contents => {
  console.log(contents);
})

import('./sub-module')
  .then((m) => {
    console.log('a is', m.a)
  })