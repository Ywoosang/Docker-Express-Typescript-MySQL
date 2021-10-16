import * as mysql from 'mysql2';
import Memo from './interfaces/Memo.interface'
import * as dotenv from 'dotenv';
dotenv.config();

// create pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: "root",
    port: 3306,
    password: "example_password",
    database: process.env.DATABASE_NAME,
});


pool.getConnection((err, connection) => {
    if (err) {
        console.log('Database connection failed')
        console.log(err)
    } else if (connection) {
        console.log('Database connected');
        connection.release();
    }
});

export async function getAllMessages(): Promise<Memo[]> {
    const [rows]: any = await pool.promise().query(`
        SELECT * FROM Memo;
    `);
    return rows;
}

export async function postMessage(content: string) {
    const [rows] = await pool.promise().query(`
        INSERT INTO Memo (content) 
        VALUES ('${content}'); 
    `);
    return rows;
}

export async function putMessage(newContent: string, id: number) {
    await pool.promise().query(`
        UPDATE Memo
        SET content='${newContent}'
        WHERE id=${id}
        ;
    `);
}

export async function deleteMessage(id: number) {
    await pool.promise().query(`
        DELETE FROM Memo
        WHERE id=${id};
    `);
}
