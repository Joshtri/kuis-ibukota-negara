import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Coba untuk terhubung ke database
db.connect()
  .then(client => {
    console.log('Connected to the database');
    // Lakukan operasi database di sini, jika diperlukan
    client.release(); // Pastikan untuk melepaskan klien setelah digunakan
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error.message);
});


export default db;
// // Ekspor objek pool agar dapat digunakan di modul lain

// const db = new pg.Client({
//     user: process.env.POSTGRES_USER,
//     host: process.env.POSTGRES_HOST,
//     database: process.env.POSTGRES_DATABASE,
//     password: process.env.POSTGRES_PASSWORD,
//     // port: process.env.DB_PORT,
// });

// // Fungsi untuk memeriksa koneksi ke database
// async function checkDatabaseConnection() {
//     try {
//         await db.connect();
//         console.log("Koneksi ke database berhasil!");
//     } catch (error) {
//         console.error("Gagal terhubung ke database:", error);
//     }
// }

// export default db;

// // Panggil fungsi untuk memeriksa koneksi database saat aplikasi dijalankan
// checkDatabaseConnection();

// import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// // Coba untuk terhubung ke database
// pool.connect()
//   .then(client => {
//     console.log('Connected to the database');
//     // Lakukan operasi database di sini, jika diperlukan
//     client.release(); // Pastikan untuk melepaskan klien setelah digunakan
//   })
//   .catch(error => {
//     console.error('Failed to connect to the database:', error.message);
//   });

// // Ekspor objek pool agar dapat digunakan di modul lain
// export default pool;
