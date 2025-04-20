import { useState, useEffect } from 'react'
import axios from 'axios'
import Hint from './components/Hint'
import Country from './components/Country'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().startsWith(searchText.toLowerCase())
  )

  const handleSearchChange = event => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    if (searchText) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [searchText])

  return (
    <>
      <span>Find countries</span>
      <input value={searchText} onChange={handleSearchChange} />
      <Hint searchText={searchText} countriesLength={countriesToShow.length} />
      <Country countriesLength={countriesToShow.length} countries={countriesToShow} />
    </>
  )
}

export default App
