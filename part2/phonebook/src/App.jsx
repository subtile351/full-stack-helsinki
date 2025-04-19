import { useState } from 'react'

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
  
  const handleFilterChange = (event) => {
    setFilterContent(event.target.value)
  }

  const personsToShow = filterContent === '' 
    ? persons 
    : persons.filter(person => 
        person.name.toLowerCase().startsWith(filterContent.toLowerCase())
      )

  return (
  <>
    <h2>Phonebook</h2>
    <p>filter shown with</p>
    <input
      value={filterContent}
      onChange={handleFilterChange}
    />
    <h2>Add a new</h2>
    <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      <div>
        phone number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {personsToShow.map(person => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
  </>
)
}

export default App