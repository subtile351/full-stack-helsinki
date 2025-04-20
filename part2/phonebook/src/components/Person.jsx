const Person = props => {
    return (
        <li>
            <span>{props.person.name} {props.person.number}</span>
            <button onClick={props.onClick}>Delete contact</button>
        </li>
    )
}

export default Person