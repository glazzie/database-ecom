const mongodb = require('mongoose');

const orderSchema = mongodb.Schema({

  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, required: true },
  items:        { type: Object, required: true },
  price:        { type: Number, required: true },
  
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }

})

module.exports = mongodb.model('Order', orderSchema);