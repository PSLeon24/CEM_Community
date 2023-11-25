var express = require('express');
var router = express.Router();
var mssql = require('mssql');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
      const postQuery = `SELECT TOP 3 g_no, b_no, b_title, b_date FROM Board WHERE g_no = ${g_no} ORDER BY b_no DESC;`;
      const postResult = await request.query(postQuery);
      return postResult.recordset.map(post => ({
        g_no: post.g_no,
        b_no: post.b_no,
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

    // likes 수가 많은 순으로 조회하는 쿼리
    const popularPostsQuery = `
    SELECT G.g_name, B.g_no, B.b_no, B.b_title, B.likes
    FROM Board B, Board_Group G
    WHERE B.g_no = G.g_no
    ORDER BY likes DESC;
    `;
    const popularPostsResult = await request.query(popularPostsQuery);
    const popularPosts = popularPostsResult.recordset.map(post => ({
      ...post,
      b_date: new Date(post.b_date).toLocaleDateString('ko-KR'),
    }));
    

    res.render('index', {
      title: 'Express',
      groupNames: groupNames,
      top3Titles_g1: top3Titles_g1,
      top3Titles_g2: top3Titles_g2,
      top3Titles_g3: top3Titles_g3,
      top3Titles_g4: top3Titles_g4,
      top3Titles_g5: top3Titles_g5,
      top3Titles_g6: top3Titles_g6,
      top3Titles_g7: top3Titles_g7,
      popularPosts: popularPosts,  // popularPosts 정보를 템플릿에 전달
    });

    } catch (error) {
      console.error('게시판 그룹 이름을 불러오는 중 오류가 발생했습니다:', error);
      res.status(500).send('내부 서버 오류');
    }
});

/* board 페이지 라우팅 */
router.get('/board', async function(req, res, next) {
  const g_no = req.query.g_no;
  const page = req.query.page || 1; // 기본값은 1페이지

  const postsPerPage = 10; // 한 페이지에 보여질 게시물 수
  const startIndex = (page - 1) * postsPerPage;

  const query = `
    SELECT g_name FROM Board_Group WHERE g_no = ${g_no};
  `;

  const request = new mssql.Request();
  request.query(query, function(error, result) {
    if (error) {
      console.error('게시판 데이터를 가져오는 중 오류가 발생했습니다.:', error);
      return res.status(500).send('내부 서버 오류');
    }

    const g_name = result.recordset[0] ? result.recordset[0].g_name : null;
    if (!g_name) {
      console.error(`g_no에 해당하는 g_name이 없습니다: ${g_no}.`);
      return res.status(404).send('게시판을 찾을 수 없습니다.');
    }

    const postQuery = `
      SELECT * FROM Board B, Member M WHERE g_no = ${g_no} AND B.id = M.id
      ORDER BY b_date DESC
      OFFSET ${startIndex} ROWS FETCH NEXT ${postsPerPage} ROWS ONLY;
    `;

    request.query(postQuery, function(postError, postResult) {
      if (postError) {
        console.error('게시물 데이터를 가져오는 중 오류 발생:', postError);
        return res.status(500).send('게시물 데이터를 가져오는 중 오류가 발생했습니다.');
      }

      const posts = postResult.recordset.map(post => {
        // 날짜 형식을 원하는 형식으로 변환
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

// submit_comment 요청 라우트 추가
router.post('/submit_comment', async (req, res) => {
  const b_no = req.body.b_no || req.query.b_no;
  const g_no = req.body.g_no || req.query.g_no;
  const { c_content } = req.body
  const id = req.session.user ? req.session.user.id : null;
  // 만약 id가 null이라면 로그인을 유도하는 알림을 띄우고 로그인 페이지로 리다이렉션
  if (!id) {
    return res.send('<script>alert("댓글을 작성하려면 먼저 로그인하세요."); window.location.href=document.referrer;</script>');
  }

  try {
    // 현재 날짜 생성
    const currentDate = new Date().toISOString().split('T')[0];

    // Comment 테이블에 댓글 추가하는 SQL 쿼리
    const insertQuery = `
      INSERT INTO Comment (b_no, g_no, id, c_content, c_date)
      VALUES (@b_no, @g_no, @id, @c_content, @c_date);
    `;

    const request = new mssql.Request();
    request.input('b_no', mssql.Int, b_no);
    request.input('g_no', mssql.Int, g_no);
    request.input('id', mssql.NVarChar, id);
    request.input('c_content', mssql.NVarChar, c_content);
    request.input('c_date', mssql.Date, currentDate);
    
    console.log('b_no:', b_no);
    console.log('g_no:', g_no);
    console.log('c_content:', c_content);

    request.query(insertQuery, (err) => {
      if (err) {
        console.error('댓글 등록 중 오류 발생:', err);
        res.status(500).send('<script>alert("댓글 등록 중 오류가 발생했습니다."); window.location.href="/";</script>');
      } else {
        console.log('댓글이 성공적으로 등록되었습니다.');
        res.send('<script>alert("댓글이 성공적으로 등록되었습니다."); window.location.href=document.referrer;</script>');
      }
    });
  } catch (error) {
    console.error('댓글 등록 중 오류 발생:', error);
    res.status(500).send('<script>alert("댓글 등록 중 오류가 발생했습니다."); window.location.href="/";</script>');
  }
});

/* modify 페이지 라우팅 */
router.get('/modify', async function(req, res, next) {
  const g_no = req.query.g_no;
  const b_no = req.query.b_no;

  try {
    const request = new mssql.Request();

    // 데이터베이스 쿼리 실행
    const query = `
      SELECT * FROM Board B, Member M WHERE g_no = ${g_no} AND b_no = ${b_no} AND B.id = M.id;
    `;
    const result = await request.query(query);
  
    const post = result.recordset[0];
    res.render('modify', { post }); // modify.ejs 템플릿을 렌더링
  } catch (error) {
    console.error('데이터베이스 오류:', error);
    res.status(500).send('내부 서버 오류');
  }
});

/* read 페이지 라우팅 */
router.get('/read', async function(req, res, next) {
  const g_no = req.query.g_no;
  const b_no = req.query.b_no;

  try {
    const request = new mssql.Request();

    // 게시글 불러오기 데이터베이스 쿼리 실행
    const query = `
      SELECT * FROM Board B, Member M WHERE g_no = ${g_no} AND b_no = ${b_no} AND B.id = M.id;
    `;
    const result = await request.query(query);

    // 댓글 수 조회 쿼리 실행
    const commentCountQuery = `
      SELECT COUNT(*) AS commentCount
      FROM Comment C
      WHERE C.g_no = ${g_no} AND C.b_no = ${b_no};
    `;
    const commentCountResult = await request.query(commentCountQuery);
    const commentCount = commentCountResult.recordset[0].commentCount;
    
    const commentsQuery = `
      SELECT C.c_no, M.nickname, C.c_content, C.c_date
      FROM Board B, Comment C, Member M
      WHERE B.b_no = C.b_no
        AND B.g_no = C.g_no
        AND B.id = M.id
      ORDER BY b_date DESC;
    `;
    const commentsResult = await request.query(commentsQuery);

    // 조회된 데이터의 날짜를 한국 시간대로 조정
    const post = result.recordset[0];
    if (post) {
      const koreanDate = new Date(post.b_date).toLocaleDateString('ko-KR');
      post.b_date = koreanDate;
    }

    const comments = commentsResult.recordset.map(comment => {
      const koreanDate = new Date(comment.c_date).toLocaleDateString('ko-KR');
      comment.c_date = koreanDate;
      return comment;
    });
    console.log(comments);
    // 조회된 데이터를 read.ejs 템플릿에 전달하여 렌더링
    res.render('read', { post, commentCount, comments });
  } catch (error) {
    console.error('데이터베이스 오류:', error);
    res.status(500).send('내부 서버 오류');
  }
});

/* 좋아요 라우팅 */
router.post('/increaseLike', async function(req, res) {
  const g_no = req.body.g_no;
  const b_no = req.body.b_no;

  try {
    // 좋아요 증가 로직
    const increaseLikeQuery = `
      UPDATE Board
      SET likes = likes + 1
      WHERE g_no = @g_no AND b_no = @b_no;
    `;

    // 쿼리 실행
    const request = new mssql.Request();
    request.input('g_no', mssql.Int, g_no);
    request.input('b_no', mssql.Int, b_no);

    const result = await request.query(increaseLikeQuery);

    // 결과 확인 (실제로는 이 결과를 클라이언트에게 전송할 수 있음)
    console.log('좋아요가 성공적으로 증가되었습니다.');
    //res.json({ likes: result.rowsAffected.length > 0 ? result.recordset[0].likes : 0 });
  } catch (error) {
    console.error('좋아요 증가 중 오류 발생:', error);
    res.status(500).send('좋아요 증가 중 오류가 발생했습니다.');
  }
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
