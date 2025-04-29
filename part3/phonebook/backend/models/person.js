// Importing Mongoose for MongoDB interaction
const mongoose = require('mongoose')

// Disable strict query mode in Mongoose (for backward compatibility)
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error conencting to MongoDB:', error.message)
  })

// Define the schema for a "Person" document in the database
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name is too short'],
    required: [true, 'Name is requried']
  },
  number: {
    type: String,
    minLength: [8, 'Number is too short'],
    validate: {
      validator: function(v) {
        return /^([^-\s]+)-([^-\s]+)$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'Phone number is requried']
  },
})

// Transform the way how documents are returned from MongoDB
// Make id field a string and omit original id object and version of the document from the final object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the Mongoose model for the "Person" schema
module.exports = mongoose.model('Person', personSchema)