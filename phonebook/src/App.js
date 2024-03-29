import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './service'

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
    setNewName('Add Name...')
    setNewNumber('Add Number...')

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))})

    // axios
    //   .post('http://localhost:3001/persons', personObject)
    //   .then(response => {
    //     console.log(response)
    //   })

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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add Name...')
  const [newNumber, setNewNumber] = useState('Add Number...')  
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    console.log('effect')
    // axios.get('http://localhost:3001/persons')
    // .then(response => {
    //   console.log('promise fulfilled')
    //   setPersons(response.data)
    // })
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
        <Display peopleToDisplay = {peopleToDisplay} 
        toDelete={(id) => toDelete(persons.id)}/>
      </ul>
    </div>
  )
}


const Display = ({peopleToDisplay, setPersons, persons}) => (
  <ul>
  {peopleToDisplay.map((person, index) => (
    <li key={index}>
      {person.name} {person.number} 
      <button
      onClick={() => toDelete(person.id, setPersons, persons)}>  delete</button></li>
  ))}
  </ul>
)


const toDelete = (id, setPersons, persons) => {
  const person = persons.find(n => n.id === id)

  if (window.confirm("Delete" + person.name + "?")) {
  console.log('delete' + id)
  axios.delete(`http://localhost:3001/persons/${id}`)
    .then(response => {
      console.log(response.data)
      setPersons(persons.map(person => person.id !== id))
    })
    .catch(error => {
      console.error(error);
    });
  }
}


export default App