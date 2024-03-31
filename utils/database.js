import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Hapus baris ini jika tidak diperlukan atau sesuaikan dengan konfigurasi keamanan server Anda
  }
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
