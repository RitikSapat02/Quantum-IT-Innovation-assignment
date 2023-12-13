const express = require('express');
const router = express.Router();
const cors = require('cors');         //we do wanna make sure we can connect to diffrent hosts even if its diffrent endpoints with different hosts
const {test,registerUser,loginUser} = require('../controllers/authController')

//middlewares
router.use(cors({
    credentials:true,            //access-control-allow-credentials:true
    origin:true
}))

router.get('/',test);    //test will be fun (req,res)=>{} implemented in controllers
router.post('/register',registerUser);
router.post('/login',loginUser);


module.exports = router;