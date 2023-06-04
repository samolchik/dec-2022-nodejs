// ДЗ:
// Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs, при видаленні - видаляти.
// При створенні валідацію на ім'я і вік, ім'я повинно бути більше 3 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є
//
// const express = require('express');
// const fileService = require('./service');
//
// const app = express();
//
// app.use(express.json);
// app.use(express.urlencoded({extended: true}));
//
// // const creator = async () => {
// //     await fs.mkdir(path.join(process.cwd(), 'dataBase'), {recursive: true});
// //     await fs.writeFile(path.join(dbPath), '[]')
// // };
// // creator();
//
// app.get('/users', async (req, res) => {
//     const users = await fileService.reader();
//     res.json(users);
// });
//
// app.post('/users', async (req, res) => {
//     const {name, age} = req.body;
//
//     if (!name || name.length < 5) {
//         return res.status(400).json('name is wrong');
//     }
//     if (!age || age < 10 || age > 110) {
//         return res.status(400).json('age is wrong');
//     }
//
//     const users = await fileService.reader();
//     const newUser = {
//         id: users.length ? users[users.length - 1].id + 1 : 1,
//         name,
//         age,
//     }
//     users.push(newUser);
//
//     await fileService.writer(users);
//
//     res.status(201).json(newUser);
// });
//
// const PORT = 5100;
// app.listen(PORT, ()=> {
//     console.log(`It is port ${PORT}`)
// })

const express = require('express');
const fileService = require('./service');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))

// CRUD - create, read, update, delete

app.get('/users', async (req, res) => {
    const users = await fileService.readDB();
    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();

    const user = users.find((user) => user.id === +id);
    if (!user) {
        return res.status(422).json('user not found');
    }

    res.json(user);
});

app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json('name is wrong');
    }
    if (!age || age < 0 || age > 100) {
        return res.status(400).json('age is wrong');
    }

    const users = await fileService.readDB();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        age,
    }
    users.push(newUser);

    await fileService.writeDB(users);

    res.status(201).json(newUser);
});

app.patch('/users/:userId', async (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body;

    if (name && name.length < 2) {
        return res.status(400).json('name is wrong');
    }
    if (age && (age < 0 || age > 100)) {
        return res.status(400).json('age is wrong');
    }

    const users = await fileService.readDB();
    const user = users.find((user) => user.id === +id);

    if (!user) {
        return res.status(422).json('user not found');
    }
    if (name) user.name = name;
    if (age) user.age = age;

    await fileService.writeDB(users);

    res.status(201).json(user);
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();
    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.status(422).json('user not found');
    }
    users.splice(index, 1);
    await fileService.writeDB(users);

    res.sendStatus(204);
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT} 🥸`)
});
