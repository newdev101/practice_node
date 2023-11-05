const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
PORT = 8000;

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));

//ROUTES
//server side rendaring
app.get("/users", (req, res) => {
  const html = `
     <!DOCTYPE html>
     <ul>
          ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
     </ul>
     `;
  res.send(html);
});

//jason
app
  .route("/api/users")
  .get((req, res) => {
    console.log("new get request received");
    return res.json(users);
  })
  .post((req, res) => {
    console.log("new post request received");
    const body = req.body;
    // body.id=users.length+1;
    console.log(body);
    users.push({ ...body, id: users.length + 1 });
    users.push(body);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      console.log("status:sucess");
      return res.json({ status: "sucess" });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    console.log("new get req received");
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .put((req, res) => {
    console.log("new put request received");
    return res.json({ request: "pneding" });
  })
  .patch((req, res) => {
    console.log("new patch request received");
    const body = req.body;
    const id = Number(req.params.id);

    //updating users object;
    users[id - 1].first_name = body.first_name;
    users[id - 1].last_name = body.last_name;
    users[id - 1].email = body.email;
    users[id - 1].gender = body.gender;
    users[id - 1].job_title = body.job_title;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      console.log("status:sucess");
      return res.json({ status: "sucess" });
    });
  })
  .delete((req, res) => {
    console.log("new delete request received");
    const id = Number(req.params.id);
    users.splice(id - 1, 1);
    for (var i = id - 1; i < users.length; i++) users[i].id--;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
         console.log("status:sucess");
         return res.json({ status: "sucess", current_length:users.length });
    });
  });

app.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
