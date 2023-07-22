require('dotenv').config()
const mongoose = require('mongoose')

const dbConnect = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`Database connected`)
    } catch (error) {
        throw new Error(`Database connection error`)
    }
    
}


module.exports ={
    dbConnect
}