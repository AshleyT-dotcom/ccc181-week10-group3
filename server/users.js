// "Database": an in-memory list. Passwords are stored HASHED, never as text.
const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Demo Student',
    email: 'student@campusconnect.test',
    passwordHash: bcrypt.hashSync('Campus26', 10),
  },
];

// Compared against when the email is unknown, so "unknown email" and
// "wrong password" take about the same time (no account enumeration).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

const findByEmail = (email) => users.find((u) => u.email === email);
const findById = (id) => users.find((u) => u.id === id);

// The ONLY shape that may leave the server. No password, no hash.
const toPublic = ({ id, name, email }) => ({ id, name, email });

module.exports = { findByEmail, findById, toPublic, DUMMY_HASH };
