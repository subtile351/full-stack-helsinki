const Hint = ({ searchText, countriesLength }) => {
    if (!searchText) {
        return (<p>Start typing a country name</p>)
    } else if (countriesLength > 10) {
        return (<p>{countriesLength} Too many matches, specify another filter</p>)
    } else {
        return <p>Search results:</p>
    }
}

export default Hint