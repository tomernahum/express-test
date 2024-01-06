import Database from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });
db.exec("PRAGMA journal_mode = WAL;");

db.query(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        ownerId TEXT, 
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
).run();
db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
).run();


export default db