const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const { timeStamp } = require("console");
PORT = 8000;

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `\n${Date.now()} ${req.method} ${req.path} ${req.url}`;
  fs.appendFile("./log.txt", log, () => {});
  next();
});//middleware to update log



//connecting to db
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube_app_3")
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//declaring schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
);
//declaring model
const User = mongoose.model("user", userSchema);

//ROUTES
//server side rendaring
app.get("/users",async (req, res) => {
  const allUser =await User.find({});
  const html = `
     <!DOCTYPE html>
     <ul>
          ${allUser
            .map((user) => `<li>${user.first_name} ${user.email}</li>`)
            .join("")}
     </ul>
     `;

  console.log("status : success");
  res.status(200).send(html);
});

//jason
app
  .route("/api/users")
  .get(async(req, res) => {
    console.log(`new ${req.method} request received`);
    const allUser =await User.find({});
    console.log("status:success");
    return res.json(allUser);
  })
  .post(async(req, res) => {
    console.log(`new ${req.method} request received`);

    const body = req.body;
    if (!body || !body.first_name || !body.email || !body.job_title) {
      console.log("status:wrong data");
      return res.status(401).json({ status: "unsuficiant data" });
    }

    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    console.log(result);
    console.log("status:success");
    res.status(201).json({ status: "success" });

  });


//
app
  .route("/api/users/:id")
  .get(async(req, res) => {
    console.log(`new ${req.method} request received`);
    const user = await User.findById(req.params.id);
    if(user){
      console.log("status:success");
      return res.status(200).send(user);
    }
    else{
      console.log("status: id doesn't exist");
      return res.status(404).json({status:"id doesn't exist"});
    }
  })
  .put((req, res) => {
    console.log("new put request received");
    return res.json({ request: "pneding" });
  })
  .patch(async(req, res) => {
    console.log(`new ${req.method} request received`);
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.last_name,
      gender:body.gender,
      job_title:body.job_title,
    });

    console.log(`user with id=${req.params.id} is updated`);
    return res.status(200).json({status:"user updated"});
  })
  .delete(async(req, res) => {
    console.log(`new ${req.method} request received`);
    const user=await User.findByIdAndDelete(req.params.id);

    if(!user){
      console.log(`status:user with id=${req.params.id} doesn't exist`);
      return res.status(404).json({status:"user doesn't exist"});
    }

    console.log(`user with id=${req.params.id} is deleted`);
    return res.status(200).json({status:"user deleted"});
  });

app.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
