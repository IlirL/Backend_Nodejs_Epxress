import express from 'express'
import morgan from 'morgan'
import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import path from 'path'

var __dirname = path.resolve()

const app = express()
const port = 3000;

morgan.token('id', function getid(req){
    return req.id;
})

morgan.token('param', function(req, res, param){
    return "userToken";
})

app.use(assignid);

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'})

// app.use(morgan(':id :param :method :status :url :date "HTTP/:http-version"'))
app.use(morgan(':id :param :method :status :url :date "HTTP/:http-version"',{stream:accessLogStream}))


// app.use(morgan('combined'))
// app.use(morgan('tiny'))
// app.use(morgan(':method :status :url :date "HTTP/:http-version"'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get('/', (req, res)=>{
    res.end("Morgan Logger App");
})


function assignid(req, res, next){
    req.id = uuidv4();
    next()
}

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})