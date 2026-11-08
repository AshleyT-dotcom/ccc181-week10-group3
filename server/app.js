const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, CLIENT_ORIGINS } = require('./config');
const { findByEmail, findById, toPublic, DUMMY_HASH } = require('./users');
const app = express();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 128;

app.disable('x-powered-by');

// CORS first, then the JSON parser, both BEFORE the routes.
app.use(
  cors({
    origin: CLIENT_ORIGINS,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '10kb' }));

// GET /api/v1/health
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// POST /api/v1/sessions (log in)
app.post('/api/v1/sessions', (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const { email, password } = body;

  const valid =
    typeof email === 'string' &&
    typeof password === 'string' &&
    EMAIL_RE.test(email.trim()) &&
    email.length <= MAX_LEN &&
    password.length > 0 &&
    password.length <= MAX_LEN;

  if (!valid) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = findByEmail(email.trim().toLowerCase());
  const matches = bcrypt.compareSync(password, user ? user.passwordHash : DUMMY_HASH);

  if (!user || !matches) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ token, user: toPublic(user) });
});

// Token check: reads "Authorization: Bearer <token>"
function requireAuth(req, res, next) {
  const [type, token] = (req.headers.authorization || '').split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.sub;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
}

// GET /api/v1/users/me
app.get('/api/v1/users/me', requireAuth, (req, res) => {
  const user = findById(req.userId);
  if (!user) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  return res.status(200).json(toPublic(user));
});

// Unknown address
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// Unexpected errors (keep the stack trace hidden)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  console.error(err.message);
  return res.status(500).json({ error: 'Something went wrong.' });
});

module.exports = app;
