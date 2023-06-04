const fs = require('node:fs/promises');
const path = require('node:path');

const dbPath = path.join(process.cwd(), 'dataBase', 'db.json');
// const reader = async () => {
//     const buffer = await fs.readFile(dbPath);
//     const data = buffer.toString();
//
//     return data ? JSON.parse(data) : [];
// };
//
//
// const writer = async (users) => {
//     await fs.writeFile(dbPath, JSON.stringify(users));
// }
//
// module.exports = {
//     reader,
//     writer
// }



module.exports = {
    readDB: async () => {
        const buffer = await fs.readFile(dbPath);
        const json = buffer.toString();
        return json ? JSON.parse(json) : [];
    },

    writeDB: async (users) => {
        await fs.writeFile(dbPath, JSON.stringify(users));
    }
}