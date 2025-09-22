import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const loggingMiddleWare = (req, res, next) => {
  console.log(`Logging ${req.method} and ${req.url}`);
  next();
};

// app.use(loggingMiddleWare);

//middleware
const resolveIndex = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId))
    return res
      .status(400)
      .send({ status: false, message: "Bad Request. Id must be a number" });

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.status(404).send("Not found");

  req.findUserIndex = findUserIndex;
  next();
};

const users = [
  { id: 1, username: "randy", displayName: "Ransel" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "shannel", displayName: "Shannel" },
  { id: 4, username: "anson", displayName: "Anson" },
  { id: 5, username: "jerry", displayName: "Jerry" },
];

app.get("/", loggingMiddleWare, (req, res) => {
  res.send("Homepage");
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

  const newUser = { id: users[users.length - 1].id + 1, ...req.body };
  users.push(newUser);
  res.status(201).send(newUser);

  // res.send(newUsers);
});

//put request
app.put("/api/users/:id", resolveIndex, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  res.sendStatus(204);
});

//patch request
app.patch("/api/users/:id", resolveIndex, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { ...users[findUserIndex], ...body };
  res.sendStatus(204);
});

//get user by id
app.get("/api/users/:id", async (req, res) => {
  const parseId = parseInt(req.params.id);

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
