const { Router } = require('express');
const { createUserAccount, loginUser, getTransfersByUser } = require('../controllers/users.controller');


const router = Router();

router.get('/:id/history', getTransfersByUser);
router.post('/signup', createUserAccount);
router.post('/login', loginUser);

module.exports = {
  usersRouter: router,
};
