interface Dict {
  word: string
}

export default (lang: string): Promise<Dict> => {
  // return Promise.resolve(require('./' + lang).default)
  // return new Promise((resolve) => {
  //   console.log('requring dict', lang)
  //   const mod = require('./' + lang)
  //   console.log('mod', mod)
  //   resolve(mod)
  // })
  
  let imp: any
  switch (lang) {
    case 'ru': imp = import('./ru'); break
    case 'en': imp = import('./en'); break
  }
  const p = imp.then((x: any) => {
    return x.default as Dict
  })
  return p
}