
const PORT = process.env.PORT || 3000
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
morgan.token('data', function (req, res) { 
   // console.log(req)
    
    return JSON.stringify(req.body) })
app.use(express.json())

app.use(morgan(':url :method :status :res[content-length] - :response-time ms :data'))
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return String(Math.floor(Math.random() * 10000))

}
app.post('/api/persons', (request, response) => {
    let id = generateId()

    console.log(request.body)
    let name = request.body.name
    let number = request.body.number
    let person = { name, number, id }
    let personExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())
    console.log('Does person exists?', personExists)
    if (personExists) {

        response.status(400).json({ error: 'name must be unique' })
    }
    if (name && number) {
        console.log(name, number)
        persons = persons.concat(person)
        response.status(200).end()
    }
    else if (!name || !number) {

        response.status(400).json({ error: 'content is missing' })
    }

})
app.get('/api/persons', (request, response) => {

    response.json(persons)

})
app.delete('/api/persons/:id', (request, response) => {

    const id = request.params.id
    console.log(id)
    persons = persons.filter(p => p.id !== String(id))
    console.log(persons)
    response.status(204).end()
})
app.get('/api/persons/:id', (request, response) => {

    const id = request.params.id
    console.log(`Id is ${id}`)
    let person = persons.find(p => p.id === String(id))
    if (person)
        response.json(person)
    else {
        response.status(404).end()
    }

})
app.get("/info", (request, response) => {

    let date = new Date()
    response.send(`<div>Phonebook has info for ${persons.length} people
        <p>${date}</p>
        </div>`)
})
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))