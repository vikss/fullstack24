
const Persons = (props) => {

    let persons = props.persons
    let filter = props.filter
    let filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter))

    return (<div>{
        filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}
            <button value={person.id} onClick={props.handleDelete}> delete</button>
        </div>)}</div>)


}
export default Persons