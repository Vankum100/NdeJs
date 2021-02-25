const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is our schema file for the mongodb

let AccountSchema = new Schema({
  ETH: { type: String, required: false, max: 64 },
  index: { type: String, required: false },
  timestamp: { type: Number, required: false },
  vETH: { type: Number, required: false },
  precedingHash: { type: String, required: false },
  hash: { type: String, required: false },
  nonce: { type: Number, required: false },
});

// Export the model
module.exports = mongoose.model('Account', AccountSchema);
