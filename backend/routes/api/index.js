const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser, requireAuth, setTokenCookie } = require("../../utils/auth.js");

router.get('/test', requireAuth, (req, res, next) => {
  res.json({message: 'Success'})
})

// // login/logout
router.use('/session', sessionRouter);

// signup / login / logout
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// GET /api/restore-user
// router.use(restoreUser);
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
