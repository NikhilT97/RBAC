const mongoose = require('mongoose')

const connectToDatabase = async () => {
        try {
            const connect = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB Connected: ${connect.connection.host}`)
        } catch (error) {
            console.error(`MongoDB Connection Failed: ${error.message}`)
            process.exit(1)
        }
}

module.exports = connectToDatabase