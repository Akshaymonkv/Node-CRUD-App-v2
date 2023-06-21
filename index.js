const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const uuid = require("uuid").v4

const app = express()
app.use(bodyParser.json())

//create a post method to get data from input and write it into a local json file
app.post("/todos",(req, res, next)=>{

    const {body} = req
    const todo1 = JSON.stringify({id:uuid(),...body})
    
    fs.appendFile("data.json",todo1, (err)=>{
        if(err){
            res.status(500).send("Unable to write")
        }
        else{
            res.status(200).send("Write succesfull")
        }
    })

})
//create a get method to read the file and display
app.get("/todos",(req, res, next)=>{

    fs.readFile("data.json","utf-8",(err, data)=>{
        if(err){
            res.status(400).send("Unable to read data")
        }
        else{
            const ndata = JSON.parse(data)
            res.status(200).json(ndata)
        }
    })

    res.status(200).json(body)
})

app.listen("8080",()=>console.log("Up and running"))
