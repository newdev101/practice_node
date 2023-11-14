const {setUser, getUser}=require('../services/auth');

async function restrictToLoggedInUserOnly(req,res,next){
     const uid = req.cookies.uid;
     if(!uid) return res.redirect('/login');

     const user = getUser(uid);
     if(!user) return res.redirect('/login');

     req.user_id=user._id;
     next();
}
async function findUserByUid(req,res,next){
     const uid = req.cookies.uid;
     const user = await getUser(uid);

     console.log("middleware request at home route");
     if(user)console.log("user already loggedin",user);

     req.user=user;
     next();
}


module.exports={
     restrictToLoggedInUserOnly,
     findUserByUid,
}