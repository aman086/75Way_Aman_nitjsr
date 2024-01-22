const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/LoginSignUpTutorial")
.then(()=>{
   console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    hobbies: {
        type: Array,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    location:{
        type: String,
    }
})


const collection = new mongoose.model("LogInCollection" , LogInSchema)

module.exports=collection