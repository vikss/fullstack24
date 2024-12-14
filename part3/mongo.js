

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