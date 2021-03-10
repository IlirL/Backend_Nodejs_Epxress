import express from 'express'
import path from 'path'
import fs from 'fs'

var __dirname = path.resolve(); 
const app = express();

const port = process.env.PORT || 3000;

app.use(function(req, res, next){
    console.log("Request Date = " + new Date());
    next();
})

app.use(function(req, res, next){
    var filepath = path.join(__dirname, 'static', req.url);
    fs.stat(filepath, function(err, fileInfo){
        if(err){
            next();
            return;
        }
        if(fileInfo.isFile()){
            res.sendFile(filepath);
        }
        else{
            next();
        }
    })
})

app.use(function(req, res){
    res.status(404);
    res.send("File not FOund");
})

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
})