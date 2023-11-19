const { TextDecoder, TextEncoder } = require('node:util')
 
Object.defineProperties(global, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})
 
const { Blob, File } = require('node:buffer')
const { fetch, Headers, FormData, Request, Response } = require('undici')
 
Object.defineProperties(global, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})