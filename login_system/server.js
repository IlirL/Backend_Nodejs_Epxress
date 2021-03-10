import express from 'express';
import path from 'path';
import bodyparser from 'body-parser'
import session from 'express-session'
import { v4 as uuidv4 } from 'uuid';
import router from './router.js'

const app = express();

const __dirname = path.resolve();

const port  = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))


app.set('view engine', 'ejs');

//load static asssets
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use(session({
    secret:uuidv4(),
    resave:false,
    saveunitialized:true
}))

app.use('/route', router)

//home route
app.get('/', (req, res) => {
    res.render('base', {
        title: "Login System"
    })
})

app.listen(port, ()=>console.log('Listening on Port' + port) )