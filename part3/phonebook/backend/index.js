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
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random()*9999999)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)


    response.json(person)
})

app.delete('/api/persons/:id', (request, resposne) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)

    resposne.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})