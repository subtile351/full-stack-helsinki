import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterContent, setFilterContent] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = filterContent === '' 
    ? persons 
    : persons.filter(person => 
        person.name.toLowerCase().startsWith(filterContent.toLowerCase())
      )

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let isDuplicate = false

    persons.forEach((person) => person.name === personObject.name ? isDuplicate = true : isDuplicate = isDuplicate)

    if (isDuplicate) {
      alert(`${personObject.name} is already added to the phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletion = personToDelete => {
    if (window.confirm(`Are you sure you want to remove ${personToDelete.name} from the phonebook?`)) {
      personService.remove(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
  }

  return (
  <>
    <h2>Phonebook</h2>
    <Filter content={filterContent} setContent={setFilterContent}/>
    <h2>Add a new</h2>
    <Form
      addName={addName}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
    />
    <h2>Numbers</h2>
    <ul>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} onClick={() => handleDeletion(person)} />
      ))}
    </ul>
  </>
)
}

export default App