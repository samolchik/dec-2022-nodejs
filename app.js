// ДЗ:
// Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
//
// FILE: {fileName}
// FOLDER: {folderName}

const path = require('node:path');
const fs = require('node:fs/promises');

const creator = async () => {
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    // const mainPath = path.join(process.cwd(), 'mainFolder')
    // await fs.mkdir(mainPath);

    // for (const folderName of folderNames) {
    //     await fs.mkdir(path.join(mainPath, folderName), {recursive: true});
    //
    // }
    //
    // for (const fileName of fileNames) {
    //     await fs.writeFile(path.join(mainPath, fileName), 'hello-hello')
    // }
    //
    // const files = await fs.readdir(mainPath);
    // for (const file of files) {
    //     const stat = await fs.stat(path.join(mainPath, file));
    //     console.log(path.join(mainPath, file), ':', stat.isDirectory() ? 'FOLDER' : 'FILE');
    //     // console.log(path.join(mainPath, file), ':', stat.isFile());
    // }

    //or variant 2

    const basePath = path.join(process.cwd(), 'baseFolder')
    await fs.mkdir(basePath);

    await Promise.all(folderNames.map(async (folder) => {
        const folderPath = path.join(basePath, folder);
        await fs.mkdir(path.join(folderPath), {recursive: true})

        await Promise.allSettled(fileNames.map(async (file) => {
            await fs.writeFile(path.join(folderPath, file), 'variant 2')
        }))
    }))

    const files = await fs.readdir(basePath);
    for (const file of files) {
        const stat = await fs.stat(path.join(basePath, file));
        console.log(path.join(basePath, file), ':', stat.isDirectory() ? 'FOLDER' : 'FILE');
    }

    const readFolder = await fs.readdir(path.join(basePath, 'folder1'))
    for (const file of readFolder) {
        const stat2 = await fs.stat(path.join(basePath, 'folder1', file));
        console.log(path.join(basePath, file), ':', stat2.isFile());
    }
};

creator();
