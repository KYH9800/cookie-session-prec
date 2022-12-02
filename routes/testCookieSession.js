const express = require('express');
const router = express.Router();

// [연습문제]
// `GET` Method로 `[http://localhost:5001/set]`을 호출했을 때,
// name에 nodejs가 저장된 쿠키를 할당하고
// `GET` Method로`[http://localhost:5001/get]`을 호출했을 때,
// 쿠키에 등록된 정보들이 반환되는 API를 만들어주세요!

// 고유의 키 값을 가진 session 키를 생성 > 고유 키에 정보를 담는다 > 쿠키를 만든다 > 발급
let session = {}; // 정보를 담을 session 객체 생성
router.get('/set', (req, res) => {
  const name = 'nodejs';
  const uniqueInfo = Date.now(); // 현재 시간이 고유의 session Key
  session[uniqueInfo] = { name };
  console.log('session: ', session);
  // cookie 생성
  res.cookie('sessionKey', uniqueInfo);
  return res.status(200).end();
});

// req를 이용해 cookie에 접근 > 해당 키를 이용해 사용자 정보를 조회 > 정보를 반환
router.get('/get', (req, res, next) => {
  const { sessionKey } = req.cookies;
  const name = session[sessionKey];
  console.log('name: ', name);

  return res.status(200).json({ name });
});

module.exports = router;
