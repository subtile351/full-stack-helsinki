const Filter = props => {
    const handleFilterChange = (event) => {
        props.setContent(event.target.value)
    }

    return (
        <>
            <p>filter shown with</p>
            <input
                value={props.filterContent}
                onChange={handleFilterChange}
            />
        </>
    )
}

export default Filter