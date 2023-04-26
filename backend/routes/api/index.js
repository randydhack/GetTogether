const router = require('express').Router();

const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js')
const eventsRouter = require('./events.js')
const membershipsRouter = require('./memberships.js')
const attendeesRouter = require('./attendees.js')
const imageRouter = require('./images.js')


const { restoreUser } = require('../../utils/auth.js')

router.use(restoreUser)

// signup / login / logout
router.use('/users', usersRouter);

// groups
router.use('/groups', groupsRouter);

// venues router
router.use('/venues', venuesRouter);

// events router
router.use('/events', eventsRouter);

// groups
router.use('/memberships', membershipsRouter);

// attendees
router.use('/attendees', attendeesRouter);

// images
router.use('/images', imageRouter);

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
