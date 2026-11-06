// Run with the API already started:  npm run smoke   (Node 18+)
// Mirrors the instructor's Postman table. Prints PASS/FAIL per check.
const base = process.env.API || 'http://localhost:3000/api/v1';

async function call(method, path, { body, headers } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body,
  });
  let json = null;
  try { json = await res.json(); } catch { /* no body */ }
  return { status: res.status, json };
}

(async () => {
  let failed = 0;
  const check = (name, cond) => {
    console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
    if (!cond) failed++;
  };

  const health = await call('GET', '/health');
  check('GET /health -> 200 {status:"ok"}', health.status === 200 && health.json?.status === 'ok');

  const good = await call('POST', '/sessions', {
    body: JSON.stringify({ email: 'student@campusconnect.test', password: 'Campus26' }),
  });
  check('login correct -> 200 + token + user', good.status === 200 && !!good.json?.token && good.json?.user?.name === 'Demo Student');
  check('login response has no password/hash', !JSON.stringify(good.json).toLowerCase().includes('password'));

  const wrong = await call('POST', '/sessions', {
    body: JSON.stringify({ email: 'student@campusconnect.test', password: 'Wrong123' }),
  });
  check('wrong password -> 401', wrong.status === 401 && wrong.json?.error === 'Invalid email or password.');

  const unknown = await call('POST', '/sessions', {
    body: JSON.stringify({ email: 'nobody@campusconnect.test', password: 'Campus26' }),
  });
  check('unknown email -> 401, same message', unknown.status === 401 && unknown.json?.error === wrong.json?.error);

  const upper = await call('POST', '/sessions', {
    body: JSON.stringify({ email: 'Student@CampusConnect.test', password: 'Campus26' }),
  });
  check('email is case-insensitive -> 200', upper.status === 200);

  const empty = await call('POST', '/sessions');
  check('empty body -> 400', empty.status === 400);

  const noHeader = await call('GET', '/users/me');
  check('/users/me without header -> 401', noHeader.status === 401 && noHeader.json?.error === 'Not logged in.');

  const me = await call('GET', '/users/me', { headers: { Authorization: `Bearer ${good.json?.token}` } });
  check('/users/me with token -> 200 user', me.status === 200 && me.json?.email === 'student@campusconnect.test');

  const nf = await call('GET', '/nope');
  check('unknown route -> 404', nf.status === 404 && nf.json?.error === 'Not found.');

  console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed');
  process.exit(failed ? 1 : 0);
})().catch(() => {
  console.error('Cannot reach the API. Is "npm start" running inside server/?');
  process.exit(1);
});
