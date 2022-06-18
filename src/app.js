import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
import store from './store.js'

console.log('started in', process.env.NODE_ENV, 'mode')

const shoelaceBasePath = process.env.SHOELACE_BASE
setBasePath(shoelaceBasePath)
console.log('set shoelace base path to', shoelaceBasePath)

store.subscribe(listener => {
  const state = store.getState();
  console.log('state', state, listener)
})
