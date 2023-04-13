import { useEffect, useState } from 'react'
import axios from 'axios'
import noteService from './notes'

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

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
    }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
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
