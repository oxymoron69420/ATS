import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'logindb',
  password: 'User@123',
  port: 5432
});

export { pool };
