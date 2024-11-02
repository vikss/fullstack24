import { useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
 
  const handleNameAdd = (event)=>{
 console.log(event.target.value)
 const name = event.target.value
 setNewName(name)
  }
  const handleNumberAdd  = (event)=>{
   console.log(event.target.value)
   const number = event.target.value
   setNewNumber(number)
  }
  
  const handleFilterChange = (event)=>{
      console.log(event.target.value)
      const filterTerm = event.target.value
      setFilter(filterTerm)
  }

  const handleForm = (event)=>{
  event.preventDefault()
  console.log("Adding a new name in the directory")
  const personObj = {name: newName, number: newNumber}
  let names = persons.map(person=>person.name)
  let namePresent = names.find(name=>name.toLowerCase()===newName.toLowerCase())
  console.log(namePresent)
  if(typeof namePresent!==undefined){
    console.log(namePresent)
    setPersons(persons.concat(personObj))
  }
  else{
  alert(`${newName} is already added to phonebook`)
  }
  setNewName('')
  setNewNumber('')

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
       <PersonForm handleForm={handleForm} name={newName} number={newNumber} handleNameAdd={handleNameAdd} handleNumberAdd={handleNumberAdd}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons = {persons} filter={filter}></Persons>
    </div>
  )
}
const Filter = (props)=>{
return  <div>filter shown with <input value={props.filter} onChange={props.handleFilterChange}></input></div>
}

export default App
