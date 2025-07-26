const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userAuthentication = () =>{
    try{
        const token = localStorage.getItem('token');
        const decode = jwt.verify(token,process.env.SECRET);
        user.id = decode;
    }
    catch(err){
        console.log(err.message);
    }
}