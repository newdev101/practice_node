require('dotenv').config();
const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/auth");
const Blog = require("./models/blog");
const app = express();

//VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//routing
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.get("/", async (req, res) => {
  

  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });

  return res.render("home", {
    blogs: allBlogs,
    user: req.user,
  });
});

//connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongod connected"))
  .catch((err) => console.log(err));

const PORT =process.env.PORT ;
app.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
