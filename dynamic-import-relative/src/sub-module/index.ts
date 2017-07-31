export * from './a'
import lp from './lp'

declare const window: any

window.onChangeLanguageSub = function (val) {    
  val && lp(val).then((dict) => {
    console.log('onChangeLanguageSub', val)
    document.getElementById('sub-word').innerHTML = dict.next
  })  
}

import('./lp/en')
  .then((m) => {
    console.log('next is is', m.default.next)
  })