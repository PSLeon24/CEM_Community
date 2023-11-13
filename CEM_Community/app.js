var createError = require('http-errors');
var express = require('express');
// var mssql = require('mssql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.static('public'));
// SQL Server 연결 설정
// const config = {
//   user: 'sa',
//   password: 'cemcommunity',
//   server: 'localhost',
//   database: 'cem',
//   options: {
//       encrypt: true, // SSL을 사용하려면 true로 설정
//   },
// };

// SQL Server 연결
// mssql.connect(config, (err) => {
//   if (err) {
//       console.error('SQL Server 연결 오류:', err);
//       return;
//   }
//   console.log('SQL Server에 연결되었습니다.');
// });

// app.use(express.json());

// 가입하기 (회원가입) 라우트 추가
// app.post('/signup', (req, res) => {
//   const { newUsername, newPassword, fullName, studentID, nickname } = req.body;

//   const query = `
//       INSERT INTO Users (Username, Password, FullName, StudentID, Nickname)
//       VALUES (@newUsername, @newPassword, @fullName, @studentID, @nickname);
//   `;

//   const request = new mssql.Request();

//   request.input('newUsername', mssql.NVarChar, newUsername);
//   request.input('newPassword', mssql.NVarChar, newPassword);
//   request.input('fullName', mssql.NVarChar, fullName);
//   request.input('studentID', mssql.NVarChar, studentID);
//   request.input('nickname', mssql.NVarChar, nickname);

//   request.query(query, (err) => {
//       if (err) {
//           console.error('회원가입 오류:', err);
//           res.status(500).send('회원가입 중 오류가 발생했습니다.');
//       } else {
//           console.log('회원가입 성공');
//           res.status(200).send('회원가입이 성공적으로 완료되었습니다.');
//       }
//   });
// });

// 로그인 요청 처리
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const query = `
//       SELECT * FROM Users
//       WHERE Username = @username AND Password = @password;
//   `;

//   const request = new mssql.Request();

//   request.input('username', mssql.NVarChar, username);
//   request.input('password', mssql.NVarChar, password);

//   request.query(query, (err, result) => {
//       if (err) {
//           console.error('로그인 오류:', err);
//           res.status(500).send('로그인 중 오류가 발생했습니다.');
//       } else {
//           if (result.recordset.length > 0) {
//               // 로그인 성공
//               res.status(200).send('로그인 성공');
//           } else {
//               // 로그인 실패
//               res.status(401).send('아이디 또는 비밀번호가 잘못되었습니다.');
//           }
//       }
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
