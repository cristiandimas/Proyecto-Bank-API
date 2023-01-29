const { Router } = require('express');
const { newTransfers } = require('../controllers/transfers.controller');

const router = Router();

router.post('', newTransfers);

module.exports = {
  transfersRouter: router,
};
