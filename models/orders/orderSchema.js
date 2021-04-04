const mongodb = require('mongoose');

const orderSchema = mongodb.Schema({

  user:        {type: Object, default: {firstName: "no User", email: "no User", lastName: ""}},
  products:    {type: Array, required: true},
  price:       {type: Number, required: true},
  done:        {type: Boolean, default: false},
  
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }

})

module.exports = mongodb.model('Order', orderSchema);