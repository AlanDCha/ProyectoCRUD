import { createPool } from 'mariadb';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '530211',
  database: 'padrinos',
  connectionLimit: 5
});


const execDBConnection = async() => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM delitos");
    console.log(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}
execDBConnection();