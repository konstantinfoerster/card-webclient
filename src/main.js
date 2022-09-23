import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'

console.log('started in', process.env.NODE_ENV, 'mode')

const shoelaceBasePath = process.env.SHOELACE_BASE
setBasePath(shoelaceBasePath)
console.log('set shoelace base path to', shoelaceBasePath)
