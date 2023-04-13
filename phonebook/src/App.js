import { useState, useEffect } from 'react'
import axios from 'axios'

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

const AddPersons = ({newName, newNumber, setNewName, setNewNumber, persons, setPersons}) => {
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

  return (
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
  )
}

const Display = ({peopleToDisplay}) => (
  <ul>
  {peopleToDisplay.map((person, index) => (
    <li key={index}>{person.name} {person.number} </li>
  ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add Name...')
  const [newNumber, setNewNumber] = useState('Add Number...')  
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  var peopleToDisplay = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  // const peopleLowerCase = persons.map(person => {
  //   return {
  //     ...person,
  //     name: person.name.toLowerCase()
  //   }})
  // var peopleToDisplay = peopleLowerCase.filter(person => person.name.includes(filter.toLowerCase()))
  // This changes the original array to lower case.

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
        <AddPersons newName={newName} newNumber={newNumber} 
        setNewName={setNewName} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <ul>
        <Display peopleToDisplay = {peopleToDisplay} />
      </ul>
    </div>
  )
}

export default App