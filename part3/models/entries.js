const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const URI = process.env.MONGODB_URL

console.log(`Connecting to ${URI}`)
mongoose.connect(process.env.MONGODB_URL).then(()=>{


  console.log("Connection to MongoDB was a success")
}).catch(error=>console.log(error.message))

const entrySchema = new mongoose.Schema({

  name: String,
  number: Number
})
entrySchema.set('toJSON',{
transform:(document, returnedObject)=>{
  console.log(returnedObject)

    returnedObject.id=returnedObject._id.toString(),
    delete returnedObject._id
    delete returnedObject.__v
}


})
const Entry = mongoose.model('Entry', entrySchema)
module.exports = Entry