const express = require('express');
const users = require('./MOCK_DATA.json');
PORT = 8000;

const app = express();


//ROUTES
//server side rendaring
app.get('/users',(req,res)=>{
     const html = `
     <!DOCTYPE html>
     <ul>
          ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
     </ul>
     `;
     res.send(html);
});


//jason
app
.route('/api/users')
.get((req,res)=>{
     console.log("new get request received");
     return res.json(users);
})
.post((req,res)=>{
     console.log("new post request received");
     return res.json({request:"pneding"});
});


app
.route('/api/users/:id')
.get((req,res)=>{
     console.log("new get req received");
     const id = Number(req.params.id);
     const user = users.find((user)=>user.id===id);
     return res.json(user);
})
.put((req,res)=>{
     console.log("new put request received");
     return res.json({request:"pneding"});
})
.patch((req,res)=>{
     console.log("new patch request received");
     return res.json({request:"pneding"});
})
.delete((req,res)=>{
     console.log("new delete request received");
     return res.json({request:"pneding"});
});


app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));
