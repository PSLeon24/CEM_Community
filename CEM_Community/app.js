var createError = require('http-errors');
var express = require('express');
var mssql = require('mssql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var cookieParser = require('cookie-parser');

// 세션 설정
app.use(session({
  secret: 'cempig', // 세션을 암호화하는 데 사용되는 비밀 키
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPS가 아닌 환경에서도 세션을 사용하려면 false로 설정
}));

app.use(express.static('public'));
const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'CEM_Community',
  options: {
    encrypt: true,
    trustServerCertificate: true, // SSL 인증서 검증 무시
  },
};

// SQL Server 연결
mssql.connect(config, (err) => {
  if (err) {
      console.error('SQL Server 연결 오류:', err);
      return;
  }
  console.log('SQL Server에 연결되었습니다.');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 가입하기 (회원가입) 라우트 추가
app.post('/signup', (req, res) => {
  const { id, password, name, std_no, grade, nickname } = req.body;
  const role = 0;

  // Check if the ID already exists
  const checkDuplicateQuery = `
    SELECT COUNT(*) AS count FROM Member WHERE id = @id;
  `;

  const checkDuplicateRequest = new mssql.Request();
  checkDuplicateRequest.input('id', mssql.NVarChar, id);

  checkDuplicateRequest.query(checkDuplicateQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('중복 검사 오류:', checkErr);
      res.send('<script>alert("id 중복 검사 중에 오류가 발생했습니다."); window.location.href="/";</script>');
    } else {
      const isDuplicate = checkResult.recordset[0].count > 0;

      if (isDuplicate) {
        res.send('<script>alert("id가 이미 존재합니다. 새로운 id를 입력하세요!"); window.location.href="/";</script>');
      } else {
        // No duplicate ID, proceed with sign up
        const signUpQuery = `
          INSERT INTO Member (id, password, name, std_no, grade, nickname, role)
          VALUES (@id, @password, @name, @std_no, @grade, @nickname, @role);
        `;

        const signUpRequest = new mssql.Request();

        signUpRequest.input('id', mssql.NVarChar, id);
        signUpRequest.input('password', mssql.NVarChar, password);
        signUpRequest.input('name', mssql.NVarChar, name);
        signUpRequest.input('std_no', mssql.Int, std_no);
        signUpRequest.input('grade', mssql.Int, grade);
        signUpRequest.input('nickname', mssql.NVarChar, nickname);
        signUpRequest.input('role', mssql.Int, role);

        signUpRequest.query(signUpQuery, (signUpErr) => {
          if (signUpErr) {
            console.error('Sign up error:', signUpErr);
            res.send('<script>alert("회원가입에 오류가 발생했습니다!"); window.location.href="/";</script>');
          } else {
            console.log(id, '님 회원가입 성공');
            res.send('<script>alert("회원가입을 성공적으로 완료했습니다!"); window.location.href="/";</script>');
          }
        });
      }
    }
  });
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
  const { id, password } = req.body;

  const query = `
      SELECT * FROM Member
      WHERE id = @id AND password = @password;
  `;

  const request = new mssql.Request();

  request.input('id', mssql.NVarChar, id);
  request.input('password', mssql.NVarChar, password);

  request.query(query, (err, result) => {
    if (err) {
      console.error('로그인 오류:', err);
      res.status(500).send('로그인 중 오류가 발생했습니다.');
    } else {
      if (result.recordset.length > 0) {
        // 로그인 성공 & 세션에 사용자 정보 저장
        req.session.user = result.recordset[0];
        res.send('<script>alert("로그인 성공!"); window.location.href="/";</script>');
      } else {
        // 로그인 실패
        res.send('<script>alert("아이디 또는 비밀번호가 잘못되었습니다."); window.location.href="/";</script>');
      }
    }
  });
});

// 미들웨어를 추가하여 세션을 템플릿에 전달
app.use((req, res, next) => {
  res.locals.user = req.session.user; // 세션에 저장된 사용자 정보를 템플릿 변수에 전달
  next();
});

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
