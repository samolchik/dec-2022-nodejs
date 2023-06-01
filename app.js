// //EVENTS
// const events = require('node:events');
//
// const eventEmitter = new events();
//
// //1.1. Декларуємо event on (аля onClick)
// eventEmitter.on('click', (data)=> {
//     console.log(data);
// console.log('click-click');
// });
//
// //1.2. Можна декларувати  і через once, якщо потрібно лише 1 раз побачити результат
// eventEmitter.once('clickAndDied',  ()=> {
//     console.log('click and died');
// });
//
// //2. Викликаємо event за допомогою emit
//
// //2.1. Виведе в консоль тричі результат
// eventEmitter.emit('click', {data: 'Hello'});
// eventEmitter.emit('click');
// eventEmitter.emit('click');
//
// //2.2. Виведе в консоль лише один результат
// eventEmitter.emit('clickAndDied');
// eventEmitter.emit('clickAndDied');
// eventEmitter.emit('clickAndDied');

// //STREAM
// // У Node.js модуль stream використовується для роботи з потоками даних.
// // Потоки є стрічковими каналами, через які дані можуть протікати один крок за іншим.
// // Вони можуть бути корисними при роботі з великими обсягами даних або при роботі з даними в реальному часі.
// //     Основні типи потоків в Node.js:
// // 1. Readable (Читаємий потік): Використовується для читання даних. Наприклад, читання файлу або отримання даних з HTTP-запиту.
// // 2. Writable (Записуваний потік): Використовується для запису даних. Наприклад, запис даних в файл або відправка даних через HTTP-відповідь.
// // 3. Duplex (Двонаправлений потік): Потік, який одночасно може бути як читаємим, так і записуваним. Наприклад, мережевий сокет.
// // 4. Transform (Перетворювальний потік): Особливий тип потоку, який дозволяє зчитувати дані, змінювати їх і записувати в інший потік. Наприклад, стиснення або шифрування даних.
// //
// //     Основні методи і події, які можна використовувати з потоками:
// // 1. Методи Readable Stream: read(), pipe(), unpipe(), pause(), resume(), destroy(), тощо.
// // 2. Методи Writable Stream: write(), end(), destroy(), тощо.
// // 3. Події Readable Stream: data, end, error, close, readable, тощо.
// // 4. Події Writable Stream: drain, finish, error, close, pipe, unpipe, тощо.
//
// const fs = require('node:fs');
// const path = require('node:path');
//
// //витягуємо ReadStream із fs, highWaterMark = розмір чанку, який можна змінювати, за замовчуванням = 65486
// const readStream = fs.createReadStream('text.txt', {highWaterMark: 128*1024});
//
// //отримуємо дані в chunk (частинках)
// readStream.on('data', (chunk)=> {
//     console.log(chunk);
// })
//
// // для читання createWriteStream в новому файлі text2, створиться автоматично, якщо немає
// const writeStream = fs.createWriteStream('text2.txt');
//
// // Кожний новий отриманий chunk буде записуватись в створений файл text2.txt, з часом це буде копія text.txt
// // readStream.on('data', (chunk)=> {
// //     writeStream.write(chunk);
// // })
//
// //кращий спосіб записати chunk з readStream в writeStream
// readStream
//     .on('error', ()=> { // для відловлення помилок on ('error')
//         readStream.destroy();               // якщо сталася помилка, зупиняємо  читання
//         writeStream.end('ERROR on reading file'); // передаємо в файл інфо про помилку
//     })
//     .pipe(writeStream);

//lsof -i :5001 - для перевірки вільного порта
// Протокол HTTP (Hypertext Transfer Protocol) - є основним протоколом передачі даних у мережі Інтернет.
// Він використовується для комунікації між клієнтськими програмами (наприклад, веб-браузерами) та серверами для
// відправки та отримання ресурсів, таких як HTML-сторінки, зображення, відео, API-запити і т.д.
//     HTTP є безстандартним протоколом, що означає, що кожен запит та відповідь розглядається незалежно один від одного, без збереження стану між ними.
//     Протокол HTTP передає дані за допомогою текстових запитів і відповідей, які мають певну структуру.
//
//     Основні методи HTTP-запитів:
// GET: Використовується для отримання ресурсу з сервера. Наприклад, отримання веб-сторінки або зображення.
// POST: Використовується для надсилання даних на сервер для обробки. Наприклад, надсилання форми або створення нового ресурсу.
// PUT: Використовується для оновлення існуючого ресурсу на сервері.
// PATCH: Використовується для часткового оновлення існуючого ресурсу на сервері.
// DELETE: Використовується для видалення ресурсу з сервера.
//
//     Кожен HTTP-запит має заголовки, які передають додаткову інформацію про запит, таку як тип контенту, мова, кукі, тощо.
//     Також можуть бути передані дані в тілі запиту, наприклад, JSON-дані або форма даних.
//
//     HTTP-відповіді мають свій статус-код, який показує, чи був запит успішним, чи сталася помилка.
//     Деякі загальні статус-коди включають 200 (ОК), 404 (Не знайдено), 500 (Внутрішня помилка сервера) і т.д.
//     Відповіді також містять заголовки та додаткові дані, які можуть бути передані в тілі відповіді.
//
//     Node.js надає вбудований модуль http, який дозволяє створювати HTTP-сервери та здійснювати HTTP-запити.
//     Цей модуль дозволяє взаємодіяти з HTTP-протоколом у вашому Node.js додатку.

const express = require('express');
const app = express();
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
]

// відповідає "привіт, світ", коли на домашню сторінку надходить запит GET
// app.get('/', (req, res)=> {
//     // req оримуємо дані від клієнта, res - ми віддаємо клієнту
//     // робимо запит в DB
//     res.send('hello world'); // send юзають для передачі/виведення стрічки
// });

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users[+id];
    if (!user) {
        console.log('user don\'t find')
    }
    res.status(200).json(users[+id])

});

app.post('/users', (req, res)=>{
    users.push(req.body);

    res.status(201).json({
        message: "User created."
    });
})

app.put('/users/:id', (req, res)=>{
    const { id } = req.params;

    users[+id] = req.body;

    res.status(200).json({
        message: 'User updated',
        data: users[+id],
    })
})


// для прослуховування порту
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})

