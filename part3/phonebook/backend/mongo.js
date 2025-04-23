const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://subtile58:${password}@cluster0.rrc8nqm.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const personName = process.argv[3]
const personNumber = process.argv[4]

const person = new Person({
    name: personName,
    number: personNumber,
})

if (personName && personNumber) {
    person.save().then(() => {
        console.log(`added ${personName} ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('phonebook:')
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}