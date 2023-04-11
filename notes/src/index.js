import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const notes = [
  {
    id: 1,
    content: 'HTML ir43efs easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can refvfexecute only JavaScript',
    important: true
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)