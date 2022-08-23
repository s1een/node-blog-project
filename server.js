const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const contactsRoutes = require("./routes/contact-routes");
const createPath = require("./helpers/create-path");
const postApiRoutes = require("./routes/api-post-routes");
const app = express();

app.set("view engine", "ejs");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((er) => console.log(er));

app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Listening PORT ${process.env.PORT}`);
});
// middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/about-us", (req, res) => {
  const title = "About";
  res.render("/contacts", { title });
});

app.use(postRoutes);
app.use(contactsRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = "Error page";
  res.status(404).render(createPath("error"), { title });
});
