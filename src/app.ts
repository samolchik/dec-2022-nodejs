import express, { Request, Response } from "express";

const app = express();
const users = [
  {
    name: "Olga",
    age: 34,
    gender: "female",
  },
  {
    name: "Ira",
    age: 30,
    gender: "female",
  },
  {
    name: "Illya",
    age: 34,
    gender: "male",
  },
  {
    name: "Egor",
    age: 3,
    gender: "male",
  },
];
app.get("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users[+id];
  if (!user) {
    console.log("user don't find");
  }
  res.status(200).json(users[+id]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created.",
  });
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  users[+id] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+id],
  });
});

// для прослуховування порту
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
