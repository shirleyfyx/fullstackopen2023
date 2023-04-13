import { useEffect, useState } from 'react'
import axios from 'axios'


const Note = ({note, toggleImportance}) => {
  const label = note.important
   ? 'make not important' : 'make important'

   return (
    <li> {note.content} {}
    <button onClick={toggleImportance}> {label}</button>
    </li>
   )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important }
    // keeps everything the same except the importance of the notes.

    axios.put(url, changeNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
    // it checks id the id of n is equal to id. It is it not equal, it returns 'n' unchanged,
    // if equal, returns data property from the response. 
    
    console.log('importance of ' + id + ' needs to be toggled')
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    axios.post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
      console.log(response)
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
     : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input value = {newNote}
        onChange = {handleNoteChange}/>
        <button type="submit"> save </button>
      </form>
    </div>
  )
}

export default App;
