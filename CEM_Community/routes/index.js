var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/main', function(req, res, next) {
  console.log(req.session.user);
  res.render('index', { title: 'Express' });
});

/* board 페이지 라우팅 */
router.get('/board', function(req, res, next) {
  res.render('board'); // board.ejs 템플릿을 렌더링
});

/* write 페이지 라우팅 */
router.get('/write', function(req, res, next) {
  res.render('write'); // write.ejs 템플릿을 렌더링
});

/* modify 페이지 라우팅 */
router.get('/modify', function(req, res, next) {
  res.render('modify'); // modify.ejs 템플릿을 렌더링
});

/* read 페이지 라우팅 */
router.get('/read', function(req, res, next) {
  res.render('read'); // read.ejs 템플릿을 렌더링
});

/* mypage 페이지 라우팅 */
router.get('/mypage', function(req, res, next) {
  const user = req.session.user;
  res.render('mypage',  { user }); // mypage.ejs 템플릿을 렌더링
});

// 로그아웃 라우터
router.get('/logout', (req, res) => {
  // 세션 삭제
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 중 오류 발생:', err);
    } else {
      console.log('세션 삭제 완료');
    }
    res.send('<script>alert("로그아웃 완료!"); window.location.href="/";</script>');
  });
});

module.exports = router;
