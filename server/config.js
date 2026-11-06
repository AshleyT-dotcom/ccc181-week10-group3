// Loads settings from server/.env. Fails fast with a clear message
// so a missing .env is obvious in the first second of the demo.
require('dotenv').config();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// No trailing slash: the browser sends "http://localhost:5173" exactly.
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);

if (!JWT_SECRET) {
  console.error(
    'Missing JWT_SECRET. Copy server/.env.example to server/.env and edit the values.'
  );
  process.exit(1);
}

module.exports = { PORT, JWT_SECRET, CLIENT_ORIGINS };
