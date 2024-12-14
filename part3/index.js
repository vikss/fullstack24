
require('dotenv').config()

const PORT = process.env.PORT || 6003
const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))



const Entry = require('./models/entries.js')
console.log("Fire your queries!")


morgan.token('data', function (req, res) {
    // console.log(req)

    return JSON.stringify(req.body)
})
app.use(express.json())

app.use(morgan(':url :method :status :res[content-length] - :response-time ms :data'))


const generateId = () => {
    return String(Math.floor(Math.random() * 10000))

}
app.post('/api/persons', (request, response, next) => {

    const body = request.body

    console.log('Request body is ', request.body)
    let name = body.name
    let number = body.number
    let person = { name, number }
    let id;
    console.log(person)

    if (!name || !number) {

        response.status(400).json({ error: 'content is missing' })
    }
    Entry.find({ name: name }).then(res => {
        id = res[0].id
        console.log('Matched entry id ', id)
        console.log(`No. of matches `, res.length)
        if (res.length == 0) {
            console.log("Adding a new entry in the phonebook")
            const entry = new Entry({ ...person })
            entry.save().then(res => {

                console.log(name, number)

                response.json(res)

            }).catch(error => {

                next(error)
            })

        }
        else {

            console.log("An entry by this name already exists")
            console.log("Modifying it")


            const body = request.body

            const updatedDoc = { name: body.name, number: body.number }
            console.log(`Updated entry is `, updatedDoc)
            Entry.findByIdAndUpdate(id, updatedDoc, { new: true }).then(result => {
                console.log("Updated the number for this phonebook entry")
                console.log('Result is ', result)
                response.json(result)
            }).catch(error => next(error))

        }

    })

})
app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const updatedDoc = { name: body.name, number: body.number }
    Entry.findByIdAndUpdate(id, updatedDoc, { new: true }).then(result => {

        console.log(result)
        response.json(result)
    }).catch(error => next(error))

})
app.get('/api/persons', (request, response, next) => {
    console.log("hi")
    console.log(Entry.find({}))
    Entry.find({}).then(persons => {
        console.log(persons)

        response.json(persons)
    }

    ).catch(error => {

        next(error)
    })
    //response.json(persons)

})
app.delete('/api/persons/:id', (request, response, next) => {

    const id = request.params.id
    console.log(`Id of the document to be deleted ${id}`)
    Entry.findByIdAndDelete(id).then(res => {




        console.log(`Delete document operation status: `, result)
        response.status(204).end()

    }




    ).catch(error => {
        next(error)

    })

})
app.get('/api/persons/:id', (request, response, next) => {

    const id = request.params.id
    console.log(`Id is ${id}`)
    Entry.findById(id).then(res => {
        console.log("Person is ", res)
        if (res)
            response.json(res)
        else {
            response.status(404).end()
        }
    }
    ).catch(error => {

        next(error)

    })

})
app.get("/info", (request, response, next) => {

    let date = new Date()
    Entry.find({}).then(res => {
        response.send(`<div>Phonebook has info for ${res.length} people
        <p>${date}</p>
        </div>`)


    }).catch(error => {
        next(error)
    })

})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name == 'CastError') {
        return response.status(400).send({ error: "malformed id" })

    }
    next(error)
}

// handler of requests with result to errors
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

