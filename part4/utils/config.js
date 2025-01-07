require('dotenv').config()

const PORT = process.env.PORT || 3003

const URI = process.env.MONGODB_URL

module.exports = { PORT, URI }