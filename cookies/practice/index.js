'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const SECRET = 'yonggari-coder';

app.use(cookieParser(SECRET));
app.use(express.urlencoded());

app.get('/', function (req, res) {
  const username = req.signedCookies.username; //보안 위험을 줄이기 위해서 signedCookies(검증된 쿠키만 사용)

  if (username) {
    res.send(`안녕하세요, ${username}님! <a href="/logout"> logout </a>`);
  } else {
    res.send(
      '<form method="post"><p><label>' +
        '<input type=text name="username">로그인</input>' +
        '<input type="submit" value="Submit"/>.</p></form>'
    );
  }
});

app.get('/logout', function (req, res) {
  res.clearCookie('username');
  res.redirect(req.get('Referrer') || '/');
});

app.post('/', function (req, res) {
  var minute = 60000;
  if (req.body && req.body.username) {
    res.cookie('username', req.body.username, {
      //보안 위험을 줄이기 위해 쿠키 옵션을 추가.
      maxAge: minute,
      signed: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  res.redirect(req.get('Referrer') || '/');
});

app.listen(3000);
console.log('Express는 3000번 포트에서 실행됩니다.');
