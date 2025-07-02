import pool from '../../db';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  try {
    // 1. Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    // 2. Update user with reset token
    const result = await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3 RETURNING *',
      [token, expiry, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 3. Simulate sending email (log to console)
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    console.log(`🔗 Password reset link for ${email}: ${resetLink}`);

    return res.status(200).json({ message: 'Reset link sent (check console).' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
