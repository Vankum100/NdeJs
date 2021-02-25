const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const ethereum_controller = require('./ethereum.controller');

exports.new_account = async function (req, res) {
  let ethData;

  let newAccount = new Account({});

  // await new ETH walletAddress
  ethData = await ethereum_controller.get_new_transaction();
  newAccount.ETH = ethData.hash;
  newAccount.index = ethData.index;
  newAccount.timestamp = ethData.timestamp;
  newAccount.vETH = ethData.vETH;
  newAccount.precedingHash = ethData.precedingHash;
  newAccount.hash = ethData.hash;
  newAccount.nonce = ethData.nonce;
  let resInfo = {};
  resInfo.uniqueHash = ethData.hash;
  //save account object to the database
  newAccount.save(function (err, dbResponse) {
    if (err) {
      res.send(err);
    }
    //console.log('***' + dbResponse + '***');
    resInfo.newAccountDetails = dbResponse;
    res.send(resInfo);
  });
};
