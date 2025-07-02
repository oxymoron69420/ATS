import { pool } from '../../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const { email, password } = req.body;
  const role = req.query.role; // Read role from query param like ?role=user

  if (!role) {
    return res.status(400).json({ message: 'Missing role in login request' });
  }

  console.log(`Login attempt for ${role}:`, email);

  try {
    // Determine table based on role
    let table;
    if (role === 'user') table = 'tire';
    else if (role === 'hr') table = 'hr';
    else if (role === 'admin') table = 'admin';
    else return res.status(400).json({ message: 'Invalid role' });

    // Query user from respective table
    const result = await pool.query(`SELECT * FROM ${table} WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role },  // include role in token
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1h' }
    );

    // Set token in cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax`);
    return res.status(200).json({ message: 'Login successful', role });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}