const express = require('express');
const router = express.Router();

// Require the controllers
const registerController = require('./account.controller');
const balanceController = require('./balance.controller');
const miningController = require('./mining.controller');
// create a new accounts
router.get('/register', registerController.new_account);
router.get('/info/:walletId', balanceController.balance_info);
router.get('/faucet/:walletId', miningController.spend_coin);

module.exports = router;
