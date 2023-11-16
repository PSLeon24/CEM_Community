const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'password',
  server: 'localhost',
  database: 'dbname',
  options: {
    encrypt: true, // 필요에 따라 설정
    trustServerCertificate: true, // SSL 인증서 검증 무시
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('데이터베이스에 성공적으로 연결되었습니다.');

    // 테스트 쿼리 실행
    await testQuery();

    // 연결 종료
    sql.close();
  } catch (error) {
    console.error('데이터베이스 연결 중 오류 발생:', error.message);
  }
}

async function testQuery() {
  try {
    // 여기에 실행할 쿼리 작성
    const result = await sql.query`SELECT * FROM Hotel`;
    console.log('쿼리 결과:', result.recordset);
  } catch (error) {
    console.error('쿼리 실행 중 오류 발생:', error.message);
  }
}

// 데이터베이스에 연결
connectToDatabase();
