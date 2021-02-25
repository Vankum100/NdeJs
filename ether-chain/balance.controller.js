const mongoose = require('mongoose');
const Account = mongoose.model('Account');
//const ethereum_controller = require('./ethereum.controller');

exports.balance_info = async function (req, res) {
  Account.findById(req.params.walletId, (err, account) => {
    if (err) {
      return res.send(err);
    }
    if (account) {
      let ethData = {};
      console.log('account : ' + account);
      const balance = account.toJSON();
      ethData.walletVETH = balance.vETH;
      ethData.accountInfo = account;
      return res.json(ethData);
    }
    return res.sendStatus(404);
  });
};
