const jwt = require('jsonwebtoken');
const secret = "rajat@23";

// const payload={

// };
// Set expiration to 2 days (2 * 24 * 60 * 60 seconds)
const expiresIn = 2 * 24 * 60 * 60;
function setUser(user){
     return jwt.sign({
          _id:user._id,
          email:user.email,
     },
     secret,
     {expiresIn},
     );
}

function getUser(token){
     if(!token) return null;
     try {
          
          return jwt.verify(token,secret);
     } catch (error) {
          return null;
     }
}

module.exports={
     setUser,
     getUser,
}