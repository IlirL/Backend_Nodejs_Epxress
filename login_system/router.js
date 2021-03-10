import express from 'express'
var router = express.Router();

const credential = {
    email:'admin@gmail.com',
    password:'admin123'
}

router.post('/login', (req, res)=>{
    console.log('username ' + req.body.username);
    console.log('password ' + req.body.password)
    if(req.body.email === credential.email && req.body.password === credential.password)
    {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard')
    }
    else{
        res.end("Invalid Username");
    }
})


//route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user:req.session.user});
    }else{
        res.send('Unauthorized user')
    }
})

//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("ERROR")
        }
        else{
            res.render('base', {title:'Express', logout:'logout Successfully'})
        }
    })
})

export default router;