const Country = ({ countriesLength, countries }) => {
    if (countriesLength >= 2 && countriesLength <= 10) {
        return (
            <>
                {countries.map(country =>
                    <p key={country.name.official}>{country.name.common}</p>
                )}
            </>
        )
    } else if (countriesLength === 1) {
        const country = countries[0]

        return (
            <>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, language]) => (
                <li key={key}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '200px', height: 'auto' }} />
            </>
        )
    }
}

export default Country