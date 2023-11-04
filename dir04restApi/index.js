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
app.get('/api/users',(req,res)=>{
     console.log("new get request received");
     return res.json(users);
});

app.get('/api/users/:id',(req,res)=>{
     console.log("new get req received");
     const id = Number(req.params.id);
     const user = users.find((user)=>user.id===id);
     return res.json(user);
});

app.put('/api/users/:id',(req,res)=>{
     console.log("new put request received");
     return res.json({request:"pneding"});
});
app.patch('/api/users/:id',(req,res)=>{
     console.log("new patch request received");
     return res.json({request:"pneding"});
});
app.delete('/api/users/:id',(req,res)=>{
     console.log("new delete request received");
     return res.json({request:"pneding"});
});


app.post('/api/users',(req,res)=>{
     console.log("new post request received");
     return res.json({request:"pneding"});
});



app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));
