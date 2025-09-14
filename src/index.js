import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, userName: "randy", displayName: "Ransel" },
  { id: 2, userName: "jack", displayName: "Jack" },
  { id: 3, userName: "shannel", displayName: "Shannel" },
];

app.get("/", (req, res) => {
  console.log("Home page");
});

app.get("/api/users", (req, res) => {
  res.status(201).send(users);
});

app.get("/api/users/:id", async (req, res) => {
  const parseId = parseInt(req.params.id);

  console.log(parseId);

  if (isNaN(parseId)) return res.status(400).send({ message: "Bad Request" });

  const user = users.find((item) => item.id === parseId);

  if (!user)
    return res
      .status(404)
      .send({ message: `User with the id ${parseId} not found!` });

  res.status(201).send({ msg: "User with id found successfully", user });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
