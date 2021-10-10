const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const getAppCookies = (req) => {
  const rawCookies = req.headers.cookie?.split('; ');
  const parsedCookies = {};

  rawCookies?.forEach(rawCookie => {
    const parsedCookie = rawCookie?.split('=');

    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  return parsedCookies;
};

const authMiddleware = (req, res, next) => {
  const cookies = getAppCookies(req);

  if (!cookies['userId']) {
    res.statusCode = 401;

    return res.json({
      error: 'Unauthorized',
    });
  }

  next();
};

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  // "preflightContinue": false,
  credentials: true,
}));

app.use(cookieParser('secret'))

app.use(express.urlencoded({
  extended: true
}));

app.post('/authenticate', (req, res) => {
  res.cookie('userId', '12121', {
    signed: true,
    // secure: true,
    httpOnly: true,
    sameSite: 'lax',
    // expires: 60 * 60, // 1 hour
    // path: '/'
  });

  res.send({
    loggedIn: true,
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send({});
});

app.get('/files', authMiddleware, (req, res) => {
  const files = [...Array(20)].map((a, idx) => {
    return {
      title: `Test file ${idx + 1}`,
    };
  });

  res.json({
    data: files,
    pagination: {
      total: files.length,
    }
  });
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});