import { pool } from './db.js';

(async () => {
    try{
        const res = await pool.query('SELECT * FROM gulugulu');
        console.log('Table Data:',res.rows);
        process.exit(0);
    } catch (err){
        console.error('DB connection error:',err);
        
    } finally {
        await pool.end();
    }
})();