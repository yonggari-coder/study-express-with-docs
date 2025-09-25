'use strict';

var express = require('express');
var app = (module.exports = express());

var logger = require('morgan');
var cookieParser = require('cookie-parser');

//커스텀 로깅
if (process.env.NODE_ENV !== 'test') app.use(logger(':method :url'));

//요청 쿠키를 파싱하고, 쿠키에 사인을 하기 위한
app.use(cookieParser('my secret here'));

// x-www-form-urlencoded 파싱
app.use(express.urlencoded());

app.get('/', function (req, res) {
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget"> forget</a>');
  } else {
    res.send(
      '<form method="post"><p> Check to <label>' +
        '<input type="checkbox" name="remember"/> remember me</label>' +
        '<input type="submit" value="Submit"/>.</p></form>'
    );
  }
});

app.get('/forget', function (req, res) {
  res.clearCookie('remember');
  res.redirect(req.get('Referrer') || '/');
});

app.post('/', function (req, res) {
  var minute = 60000;
  if (req.body && req.body.remember) {
    res.cookie('remember', 1, { maxAge: minute });
  }

  res.redirect(req.get('Referrer') || '/');
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
