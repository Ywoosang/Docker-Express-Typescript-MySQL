import * as mysql from 'mysql2';
import Post from './post.interface';
import * as dotenv from 'dotenv';
dotenv.config();

// create pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: "root",
    port:3306,
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

export async function getAllMessages(): Promise<Post[]>{
    const [rows] :any = await pool.promise().query(`
    SELECT * FROM Message;
    `);  
    return rows;
}

export async function postMessage(content: string){
    const [rows] = await pool.promise().query(`
    INSERT INTO Message (content) 
    VALUES ('${content}'); 
    `); 
    return rows;
}

export async function putMessage(newContent: string){
    await pool.promise().query(`
        UPDATE Message
        SET content='${newContent}';
    `); 
}

export async function deleteMessage(id: number){
    await pool.promise().query(`
        DELETE FROM Message
        WHERE id=${id};
    `); 
}  
 