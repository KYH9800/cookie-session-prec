const express = require('express');
const router = express.Router();
// router
const cookie_session_router = require('./cookieSession');
const test_cookie_session_router = require('./testCookieSession');

router.get('/', (req, res) => {
  res.send('hello cookie and session!!');
});

router.use('/prec', cookie_session_router);
router.use('/test', test_cookie_session_router);

module.exports = router;
