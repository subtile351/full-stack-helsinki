const Person = props => {
    return (
        <>
            <li>{props.person.name} {props.person.number}</li>
            <button onClick={props.onClick}>delete</button>
        </>
    )
}

export default Person