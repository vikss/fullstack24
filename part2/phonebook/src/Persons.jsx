
const Persons=(props)=>{

    let persons = props.persons
    let filter = props.filter 

    return (<div>{persons.filter(person=>person.name.toLowerCase().includes(filter)).map(person=><div key={person.name}>{person.name} {person.number}</div>)}</div>)


}
export default Persons