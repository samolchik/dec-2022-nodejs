//MODULES//
// const {sayHello} = require('./helpers/sayHello.helper');
// sayHello();

//GLOBAL VARIABLES//
//__dirname -  це глобальна змінна у Node.js, яка представляє поточний каталог/папку поточного модуля.
// Вона надає абсолютний шлях до каталогу, що містить виконуваний файл.
//__filename - це глобальна змінна у Node.js, яка містить абсолютний шлях до поточного файлу, де виконується код (напр. console.log(__filename));
//process.cwd -  є методом у Node.js, який повертає поточний робочий каталог процесу.
// Робочий каталог - це директорія, з якої був запущений виконуваний файл ( app.js).
//CWD - current working directory
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd())

//PATH -
// є вбудованим модулем в Node.js, для зручної роботи зі шляхами.
// Використання модуля path дозволяє виконувати операції над шляхами файлів та директорій, такі як з'єднання,
// розділення, нормалізація шляху, визначення імені файлу, розширення файлу тощо.
// const path = require('path');
// const joinedPath = path.join(__dirname, 'folder', 'folder2', 'text.txt');
// const normalisedPath = path.normalize('///test////text2');
// const resolvedPath = path.resolve('folder', 'folder2', 'text.txt'); //те саме, що і joinedPath, тобто самостійно підставляє __dirname
// console.log(joinedPath);
// console.log(normalisedPath);
// console.log(resolvedPath);

//OS - є вбудованим модулем в Node.js, який надає функціональність для взаємодії з операційною системою.
//Модуль os дозволяє отримувати інформацію про операційну систему, таку як ім'я, версія, архітектура, а також виконувати деякі операції, пов'язані з операційною системою.
// const os = require('os');
// console.log(os.cpus());
// console.log(os.arch());

//FS
// const fs = require('fs');
// const path = require('path');
//
// //
// //
// const path2File = path.join(__dirname, 'folders', 'file1.txt');
//
// fs.writeFile(path2File, 'Hello world!', (err)=> {
//     if(err) throw new Error(err.message)
// });
//
// fs.readFile(path2File, {encoding: 'utf-8'}, (err, data)=> {
//     if (err) throw new Error(err.message)
//     console.log(data)
// });
//
// //fs.appendFile - додає в файл текст, n з нового рядка
// fs.appendFile(path2File,'\njskjdbvkbsjhfvbkjhvnlwksnkdvbjdfj', (err)=> {
//     if (err) throw new Error(err.message)
// })
//
// //fs.truncate - видаляє текст в файлі
// fs.truncate(path2File, (err)=> {
//     if (err) throw new Error(err.message)
// })
//
// //fs.unlink - видяляє сам файл
// fs.unlink(path2File, (err)=> {
//     if (err) throw new Error(err.message)
// })
//
//
//
// fs.mkdir - створює нову папку в folders
// fs.mkdir(path.join(__dirname, 'folders', 'folder2'), (err)=> {
//     if (err) throw new Error(err.message)
// })
// fs.mkdir(path.join(__dirname, 'folders', 'folder3'), (err)=> {
//     if (err) throw new Error(err.message)
// })
//fs.rm - видаляє папку
// fs.rm(path.join(__dirname, 'folders', 'folder3'), {recursive: true},(err)=> {
//     if (err) throw new Error(err.message)
// })