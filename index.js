const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const { Result } = require("express-validator");
const { createSecretKey } = require("crypto");


const tempelatePath = path.join(__dirname , '../tempelates');

app.use(express.json())
app.set("view engine" , "hbs")
app.set("views" , tempelatePath);
app.use(express.urlencoded({ extended: false }))

app.get("/" , (req , res)=>{
    res.render("home");
});


app.get("/login" , (req , res)=>{
    res.render("login");
});

app.get("/signup" , (req , res)=>{
    res.render("signup");
});

app.get("/getAllData" , (req , res)=>{
    collection.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/getAllFemaleData" , (req,res)=>{
    collection.find({gender : "female"}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/getAllmaleData" , (req,res)=>{
    collection.find({gender : "male"}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
})


app.post("/signup" , async (req,res)=>{
     const data = {
        name : req.body.name,
        password : req.body.password,
        dob : req.body.dob,
        gender : req.body.gender,
        hobbies : req.body.hobbies.split(",")
     }

     await collection.insertMany([data])

     res.render("Home")
})


app.post("/login" , async (req,res)=>{
    
    try{
        const check = await collection.findOne({name: req.body.name})
        
        if(check.password === req.body.password){
            const additionalData = {
                name : check.name,
                gender : check.gender,
                hobbies : check.hobbies
            }

            res.render("afterLogin" , additionalData);
        }else{
            console.log("Password not matched")
        }
    }catch{
        res.render("wrong details");
    }

})



app.listen(3000 , (req,res)=>{
    console.log("port connected");
})