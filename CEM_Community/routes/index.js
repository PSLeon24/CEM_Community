var express = require('express');
var router = express.Router();
var mssql = require('mssql');

/* GET home page. */
router.get(['/', '/main'], async function(req, res, next) {
  try {
    const request = new mssql.Request();

    // 그룹 번호와 그룹 이름 추출
    const query = `
      SELECT g_no, g_name
      FROM Board_Group;
    `;

    const result = await request.query(query);

    const groupNames = result.recordset;

    // 게시판 그룹별 최신 게시물 3개씩 가져오기
    async function getPostsByGroup(g_no) {
      const postQuery = `SELECT TOP 3 b_title, b_date FROM Board WHERE g_no = ${g_no} ORDER BY b_no DESC;`;
      const postResult = await request.query(postQuery);
      return postResult.recordset.map(post => ({
        b_title: post.b_title,
        b_date: post.b_date.toLocaleDateString('ko-KR'),
      }));
    }

    const g_no_1 = 1;
    const top3Titles_g1 = await getPostsByGroup(g_no_1);

    const g_no_2 = 2;
    const top3Titles_g2 = await getPostsByGroup(g_no_2);

    const g_no_3 = 3;
    const top3Titles_g3 = await getPostsByGroup(g_no_3);

    const g_no_4 = 4;
    const top3Titles_g4 = await getPostsByGroup(g_no_4);

    const g_no_5 = 5;
    const top3Titles_g5 = await getPostsByGroup(g_no_5);

    const g_no_6 = 6;
    const top3Titles_g6 = await getPostsByGroup(g_no_6);

    const g_no_7 = 7;
    const top3Titles_g7 = await getPostsByGroup(g_no_7);

    res.render('index', {
      title: 'Express',
      groupNames: groupNames,
      top3Titles_g1: top3Titles_g1,
      top3Titles_g2: top3Titles_g2,
      top3Titles_g3: top3Titles_g3,
      top3Titles_g4: top3Titles_g4,
      top3Titles_g5: top3Titles_g5,
      top3Titles_g6: top3Titles_g6,
      top3Titles_g7: top3Titles_g7
    });

    } catch (error) {
      console.error('게시판 그룹 이름을 불러오는 중 오류가 발생했습니다:', error);
      res.status(500).send('내부 서버 오류');
    }
});

/* board 페이지 라우팅 */
router.get('/board', async function(req, res, next) {
  const g_no = req.query.g_no;
  const query = `
  SELECT g_name FROM Board_Group WHERE g_no = ${g_no};
`;

  const request = new mssql.Request();
  request.query(query, function(error, result) {
    if (error) {
      console.error('게시판 데이터 가져오기 오류:', error);
      return res.status(500).send('내부 서버 오류');
    }
    //console.log(result.recordset);
    const g_name = result.recordset[0] ? result.recordset[0].g_name : null;
    if (!g_name) {
      console.error(`g_no ${g_no}에 해당하는 g_name이 없습니다.`);
      return res.status(404).send('게시판을 찾을 수 없습니다.');
    }
    // 게시물 데이터 가져오는 부분 추가
    const postQuery = `
      SELECT * FROM Board WHERE g_no = ${g_no};
    `;

    request.query(postQuery, function(postError, postResult) {
      if (postError) {
        console.error('게시물 데이터 가져오기 오류:', postError);
        return res.status(500).send('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
      }

      // 가져온 게시물 데이터를 posts 변수에 저장
      const posts = postResult.recordset.map(post => {
        // 날짜를 원하는 형식으로 변환
        const formattedDate = post.b_date.toLocaleDateString('ko-KR');
        return { ...post, b_date: formattedDate };
      });

      res.render('board', { g_no: g_no, g_name, posts: posts });
    });
  });
});

/* write 페이지 라우팅 */
router.get('/write', async function(req, res, next) {
  const user = req.session.user;
  const g_no = req.query.g_no;
  const query = `
    SELECT g_name FROM Board_Group WHERE g_no = ${g_no};
  `;
  const request = new mssql.Request();
  request.query(query, function(error, result) {
    if (error) {
      console.error('게시판 데이터 가져오기 오류:', error);
      return res.status(500).send('내부 서버 오류');
    }
    //console.log(result.recordset);
    const g_name = result.recordset[0] ? result.recordset[0].g_name : null;
    if (!g_name) {
      console.error(`g_no ${g_no}에 해당하는 g_name이 없습니다.`);
      return res.status(404).send('게시판을 찾을 수 없습니다.');
    }
    //console.log(result.recordset);

    console.log(g_name);
    res.render('write', { user, g_no: g_no, g_name }); // write.ejs 템플릿을 렌더링
  });
});

// submit_post 요청 라우트 추가
router.post('/submit_post', async (req, res) => {
  const { b_title, b_content } = req.body; // 폼에서 전송된 데이터 가져오기
  const id = req.session.user ? req.session.user.id : null;
  const g_no = req.body.g_no || req.query.g_no;

  try {
    // 현재 날짜 생성
    const currentDate = new Date().toISOString().split('T')[0];

    // SQL 쿼리를 사용하여 Board 테이블에 게시물 추가
    const insertQuery = `
      INSERT INTO Board (b_no, g_no, id, b_title, b_content, b_date)
      VALUES ((SELECT ISNULL(MAX(b_no), 0) + 1 FROM Board WHERE g_no = @g_no),@g_no, @id, @b_title, @b_content, @b_date);
    `;
    
    const request = new mssql.Request();
    
    request.input('g_no', mssql.Int, g_no);
    request.input('id', mssql.NVarChar, id);
    request.input('b_title', mssql.NVarChar, b_title);
    request.input('b_content', mssql.Text, b_content);
    request.input('b_date', mssql.Date, currentDate);

    request.query(insertQuery, (err) => {
      if (err) {
        console.error('게시물 등록 중 오류 발생:', err);
        res.status(500).send('<script>alert("게시물 등록 중 오류가 발생했습니다."); window.location.href="/";</script>');
      } else {
        console.log('게시물이 성공적으로 등록되었습니다.');
        res.send(`<script>alert("게시물이 성공적으로 등록되었습니다."); window.location.href="./board?g_no=${g_no}";</script>`);
      }
    });
  } catch (error) {
    console.error('게시물 등록 중 오류 발생:', error);
    res.status(500).send('<script>alert("게시물 등록 중 오류가 발생했습니다."); window.location.href="/";</script>');
  }
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
