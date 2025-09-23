'use strict';

var express = require('express');
var hash = require('pbkdf2-password')();
var path = require('node:path');
var session = require('express-session');

var app = (module.exports = express());

//config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware

app.use(express.urlencoded());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: `yonggyun's father's Lastnam e is Lee`,
  })
);

//session-persisted message middleware

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

//더미 db

var users = {
  tj: { name: 'tj' },
};

//유저를 만들떄, salt를 생성하고 비밀번호를 해시함.

hash({ password: 'goodman' }, function (err, pass, salt, hash) {
  if (err) throw err;
  //salt와 해시를 db에 저장함.
  users.tj.salt = salt;
  users.tj.hash = hash;
});

//평문 객체를 담고 있는 db를 이용해서 인증을 진행한다!
function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  //주어진 유저명에 대해 db에 쿼리함.

  if (!user) return fn(null, null);
  // post로 전달된 비밀번호에도 동일한 알고리즘을 적용하고,
  // password랑 salt에 대해 해시를 계산한다. 일치하는 값이 있으면 해당 사용자를 찾은 것.

  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(null, null);
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/restricted', restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout"> logout </a>');
});

app.get('/logout', function (req, res) {
  //유저 세션을 삭제함.
  //세션은 다음 요청에 재생성됨.
  req.session.destroy(function () {
    res.redirect('/');
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) return next(err);
    if (user) {
      //sign in할 때, 세션을 재생성함
      req.session.regenerate(function () {
        //user의 primary key를 세션에 저장.
        // 해당 예제에서는 `유저 객체 전체`를 사용.
        req.session.user = user;
        req.session.success =
          'Authenticated as ' +
          user.name +
          ' click to <a href="/logout"> logout </a>' +
          ' You may now access <a href="/restricted">/restricted</a>';
        res.redirect(req.get('Referrer') || '/');
      });
    } else {
      req.session.error =
        'Authentication failed , please check your ' +
        'username and password. ' +
        '(use "tj and "goodman")';
      res.redirect('/login');
    }
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
