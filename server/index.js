const express = require("express");
const app = express();
const userController = require("./controllers/users");
const productController = require("./controllers/products");
const reviewsController = require("./controllers/reviews");
const repliesController = require("./controllers/replies");

const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .get("/about", (req, res, next) => {
    res.send("About Us");
  })
  .use("/api/v1/users", userController)
  .use("/api/v1/products", productController)
  .use("/api/v1/reviews", reviewsController)
  .use("/api/v1/replies", repliesController)

  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
});

console.log("Step #1");
app.listen(PORT, (err, data) => {
  console.log("Step #2");
  console.log("Server is running at http://localhost:" + PORT);
});
console.log("Step #3");

/*  Four types of async methods
    1. Node Style Callbacks
    2. Pipelines
    3. Promises
    4. Async/Await
*/
