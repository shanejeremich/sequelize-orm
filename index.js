// Load in our Express framework
const express = require(`express`);
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const routers = require("./routers/index.js");

// Create a new Express instance called "app"
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("views", __dirname + "/templates");
app.set("view engine", "twig");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "styles")));

// Home page welcome middleware
app.get("/", (req, res) => {
  res.status(200).render("home");
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

const server = app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

server.on("error", error => {
  console.error("Server Error: ", error.message);
});
