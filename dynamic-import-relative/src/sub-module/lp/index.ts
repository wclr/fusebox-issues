interface Dict {
  next: string  
}

export default (lang: string): Promise<Dict> => {   
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