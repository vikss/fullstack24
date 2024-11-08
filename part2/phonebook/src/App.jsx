import { useEffect, useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService.getAll().then(data => {
      console.log(data)
      setPersons(data)
    })




  }, [])

  const handleNameAdd = (event) => {
    console.log(event.target.value)
    const name = event.target.value
    setNewName(name)
  }
  const handleNumberAdd = (event) => {
    console.log(event.target.value)
    const number = event.target.value
    setNewNumber(number)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    const filterTerm = event.target.value
    setFilter(filterTerm)
  }


  const handleForm = (event) => {
    event.preventDefault()
    console.log("Adding a new name in the directory")
    let idArr = persons.map(p => p.id)
    console.log(idArr)
    let id = Math.max(...idArr) + 1
    id = id.toString()
    const personObj = { name: newName, number: newNumber, id }
    let names = persons.map(person => person.name.toLowerCase())
    let namePresent = names.includes(newName.toLowerCase())
    console.log(namePresent)
    if (!namePresent) {
      console.log(namePresent)

      personService.create(personObj).then(res => {

        setPersons(persons.concat(res))
        console.log(res)
        setMessage(`Added ${res.name}`)
        setError(false)


        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 10000)


      })

    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let oldPersonEntry = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        console.log("Id of the already existing entry ", oldPersonEntry.id)
        personService.updateNumber(oldPersonEntry.id, personObj).then(res => {
          let newPersonsArr = persons.filter(person => person.id != oldPersonEntry.id)


          console.log(res)
          setPersons(newPersonsArr.concat(res))


        })

      }
    }
    setNewName('')
    setNewNumber('')

  }
  const handleDelete = (event) => {
    console.log(event.target.value)
    const idToDelete = event.target.value
    const personName = persons.find(p => p.id === idToDelete).name
    if (window.confirm(`Delete ${personName}?`)) {

      personService.deleteEntry(idToDelete).then(res => {
        console.log(`Deleted object is ${res}`)
        let newPersonsArray = persons.filter(p => p.id != res.id)
        console.log(newPersonsArray)
        setPersons(newPersonsArray)
      }).catch(err => {
        console.log(`Error occurred while deleting an entry ${err}`)
        setMessage(`Information of ${personName} has already been removed from the server`)
        setError(true)
        setTimeout(() => {

          setMessage(null)
          setError(false)
        }, 10000)

      }
      )
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}></Notification>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <PersonForm handleForm={handleForm} name={newName} number={newNumber} handleNameAdd={handleNameAdd} handleNumberAdd={handleNumberAdd}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} ></Persons>
    </div>
  )
}
const Notification = ({ message, error }) => {
  console.log(message, error)
  if (error)
    return <div className='error'>{message}</div>
  else if (message)
    return <div className="message">{message}</div>
  return <div></div>

}
const Filter = (props) => {
  return <div>filter shown with <input value={props.filter} onChange={props.handleFilterChange}></input></div>
}

export default App

