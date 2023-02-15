const {Router} = require('express');


const router = Router();

router.get('/', (req,res)=>{
   const user = req.session.user;
   if(user){
    return res.redirect('/login')
   }else{
    return res.redirect('/api/sessions/register')
   }
})

router.get('/register', (req,res)=>{
    res.render('registro')
})

router.get('/login', (req,res)=>{
    const {email, contraseña} = req.body;
    
    res.render('login')
})



module.exports = router;