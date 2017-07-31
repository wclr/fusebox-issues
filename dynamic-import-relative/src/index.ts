import lp from './lp'

console.log('app is here')

declare const window: any

import('./data/target.txt' as string).then(contents => {
  console.log(contents);
})

import('./sub-module')
  .then((m) => {
    console.log('submodule a is', m.a)
  })


window.onChangeLanguage = function (val) {
  val && lp(val).then((dict) => {
    document.getElementById('app-word').innerHTML = dict.word
  })
  window.onChangeLanguageSub(val)
}

const render = () => {
  var div = document.createElement('div')
  document.body.innerHTML = ''
  div.innerHTML = `
    <div>Choose language:</div>
    <select onchange="onChangeLanguage(value)">
      <option></option>
      <option>en</option>
      <option>ru</option>
    </select>
    <div id="app-word"></div>
    <div id="sub-word"></div>
  `
  document.body.appendChild(div)
}

document.body
  ? render()
  : window.onload = () => render()


// import('./lp/ru')
//   .then((m) => {
//     console.log('word is is', m.default.word)
//   })