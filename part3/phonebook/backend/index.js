// Load environment variables from a .env file into process.env
require('dotenv').config()

// Importing the Express framework
const express = require('express')

// Importing Morgan for logging HTTP requests
const morgan = require('morgan')

// Importing the Person model from the models directory
const Person = require('./models/person')

// Initializing the Express application
const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

// Middleware to serve static files from the 'dist' directory and to load the production build of the frontend
app.use(express.static('dist'))

// Define a custom token for Morgan to log the content of POST requests
morgan.token('postContent', function (req, res) {
    // If the HTTP method is POST, return the stringified body of the request
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Use Morgan middleware to log HTTP requests in a specific format
// Includes method, URL, status, response length, response time, and POST request content (if applicable)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postContent'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    /*
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }
    */

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${body.name}$`, 'i') } },
        { number: body.number },
        { new: true } // Return the updated document
    )
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).json({ error: 'Name not found in the database' })
            }
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'incorrect id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})