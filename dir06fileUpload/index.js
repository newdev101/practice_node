const express = require("express");
const path = require("path");
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ "-"+ file.originalname );
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 8000;

//view enginee
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
