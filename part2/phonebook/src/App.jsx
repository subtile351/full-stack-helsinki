import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
  <>
    <h2>Phonebook</h2>
    <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {persons.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  </>
)
}

export default App