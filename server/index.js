const { PORT } = require('./config');
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Close the old backend terminal or change PORT in server/.env.`);
  } else {
    console.error('Server failed to start:', err.message);
  }
  process.exit(1);
});
