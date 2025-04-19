import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterContent, setFilterContent] = useState('')

  const personsToShow = filterContent === '' 
    ? persons 
    : persons.filter(person => 
        person.name.toLowerCase().startsWith(filterContent.toLowerCase())
      )

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    let isDuplicate = false

    persons.forEach((person) => person.name === personObject.name ? isDuplicate = true : isDuplicate = isDuplicate)

    console.log(isDuplicate)

    if (isDuplicate) {
      alert(`${personObject.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
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
        <Person key={person.name} person={person} />
      ))}
    </ul>
  </>
)
}

export default App