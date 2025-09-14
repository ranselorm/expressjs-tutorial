import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("Home page");
  res.end("<h1>Hello</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
