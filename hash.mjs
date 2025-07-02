// hash.js
import bcrypt from 'bcryptjs';

const password = 'User@1234'; // replace with what you want
const hashed = await bcrypt.hash(password, 10);
console.log('Hashed password:', hashed);
