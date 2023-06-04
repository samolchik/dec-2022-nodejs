"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const users = [
    {
        name: 'Olga',
        age: 34,
        gender: 'female'
    },
    {
        name: 'Ira',
        age: 30,
        gender: 'female'
    },
    {
        name: 'Illya',
        age: 34,
        gender: 'male'
    },
    {
        name: 'Egor',
        age: 3,
        gender: 'male'
    }
];
app.get('/users', (req, res) => {
    res.status(200).json(users);
});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[+id];
    if (!user) {
        console.log('user don\'t find');
    }
    res.status(200).json(users[+id]);
});
app.post('/users', (req, res) => {
    users.push(req.body);
    res.status(201).json({
        message: "User created."
    });
});
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    users[+id] = req.body;
    res.status(200).json({
        message: 'User updated',
        data: users[+id],
    });
});
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
