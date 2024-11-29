const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://admin:${password}@cluster.5pwtp.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const entrySchema = new mongoose.Schema({

  name: String,
  number: Number
})
const Entry = mongoose.model('Entry', entrySchema)
if (name && number) {


  const phonebookEntry = new Entry({
    name, number
  })

  phonebookEntry.save().then(result => {
    console.log(result)
    console.log('Phonebook entry saved!')
    mongoose.connection.close()
  })
}
else {
  Entry.find({}).then(res => {
    console.log("phonebook:")
    res.forEach(entry => console.log(entry.name + " " + entry.number))

    mongoose.connection.close()
  }


  )


}