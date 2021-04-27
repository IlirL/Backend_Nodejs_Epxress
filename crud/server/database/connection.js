const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        });

        console.log("MongoDVB connected");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDB