import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "randy", displayName: "Ransel" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "shannel", displayName: "Shannel" },
  { id: 4, username: "anson", displayName: "Anson" },
  { id: 5, username: "jerry", displayName: "Jerry" },
];

app.get("/", (req, res) => {
  console.log("Home page");
});

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    const filteredUsers = users.filter((user) => user[filter].includes(value));

    return res.send({
      status: true,
      message: "Users retrieved successfully",
      users: filteredUsers,
    });
  }

  return res.status(200).send(users);
});

//post req

app.post("/api/users", (req, res) => {
  console.log(req.body);

  const newUsers = users.push(req.body);
  res.send(newUsers);
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
