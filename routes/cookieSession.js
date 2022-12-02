const express = require('express');
const router = express.Router();

// 쿠키를 만든다
router.get('/set-cookie', (req, res) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

  res.cookie('name', 'sparta', {
    expires: expires,
  });
  return res.status(200).end();
});

// req를 이용하여 쿠키에 접근하기
router.get('/get-cookie', (req, res) => {
  const cookie = req.cookies;
  console.log(cookie); // { name: 'sparta' }
  return res.status(200).json({ cookie });
});

// /set-session API를 호출했을 때 name=sparta 의 정보를 서버에 저장하고,
// 저장한 시점의 시간 정보를 쿠키로 반환받는 API 만들기
let session = {}; // 서버에 해당하는 유저의 정보를 저장하기 위한 `session`객체를 만들었습니다.
router.get('/set-session', function (req, res, next) {
  const name = 'sparta';
  const uniqueInt = Date.now();
  // /set-session API를 호출했을 때 `name=sparta`의 정보를 session에 삽입하고,
  session[uniqueInt] = { name };

  res.cookie('sessionKey', uniqueInt); // 해당하는 데이터를 불러들이기 위한 시간 정보를 쿠키로 반환받습니다.
  return res.status(200).end();
});

// /get-session API를 호출했을 때,
// 쿠키의 시간 정보를 이용하여 서버에 저장된 name 정보를 출력하는 API 만들기
router.get('/get-session', function (req, res, next) {
  // 쿠키에 저장된 sessionKey를 이용하여
  const { sessionKey } = req.cookies;
  // session에 저장된 데이터를 불러옵니다
  const name = session[sessionKey];
  return res.status(200).json({ name });
});

module.exports = router;
