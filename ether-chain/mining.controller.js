const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.spend_coin = async function (req, res) {
  let resInfo = {};
  let account;
  let updateAcc = new Account({});

  Account.findById(req.params.walletId, (err, account) => {
    if (err) {
      return res.send(err);
    }

    if (account) {
      const startAccountInfo = account.toJSON();
      resInfo.startAccountInfo = startAccountInfo;
      let newBalance = 0;
      let newTimestamp = Date.now();
      const minQueryIntervalsMs = 120000; // 2 minutes

      if (newTimestamp < account.timestamp + minQueryIntervalsMs) {
        account.vETH = account.vETH + 1;
        console.log('newBalance1:  ' + account.vETH);
      } else {
        console.log("spamAlert: 'Mining intervals is 10 minutes minimum");
      }

      if (account.vETH > 0) {
        newBalance = account.vETH - 0.05;
        console.log('newBalance:  ' + newBalance);
      } else {
        console.log('lowFunds: You have  zero vETH and cannot mine coins');
      }
      updateAcc._id = account._id;
      updateAcc.ETH = account.hash;
      updateAcc.index = account.index;
      updateAcc.timestamp = newTimestamp;
      updateAcc.vETH = newBalance;
      updateAcc.precedingHash = account.precedingHash;
      updateAcc.hash = account.hash;
      updateAcc.nonce = account.nonce;
    }
  });

  resInfo.uniqueHash = updateAcc.hash;

  updateAcc.save(function (err, dbResponse) {
    if (err) {
      res.send(err);
    }

    resInfo.updateAccountDetails = dbResponse;
    res.send(resInfo);
  });
};
