import { useState } from 'react'

const Filter = (props) => {

  const handleFilterChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <div>
        filter shown with <input value={props.filter} onChange={handleFilterChange}/>
      </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Shirley Fang', number: '000-000-000'},
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('Add Name...')
  const [newNumber, setNewNumber] = useState('Add Number...')  
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // const peopleLowerCase = persons.map(person => {
  //   return {
  //     ...person,
  //     name: person.name.toLowerCase()
  //   }
  // })
  
  // var peopleToDisplay = peopleLowerCase.filter(person => person.name.includes(filter.toLowerCase()))
  // This changes the original array to lower case.

  var peopleToDisplay = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      
      <form onSubmit = {addPerson}>
        <div>
          name: <input value={newName} onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToDisplay.map((person, index) => (
        <li key={index}>{person.name} {person.number} </li>
      ))}
      </ul>
    </div>
  )
}

export default App