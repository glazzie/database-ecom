const mongodb = require('mongoose');
const Order = require('./orderSchema');

exports.getOrders = (req, res) => {
    Order.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}

exports.getOrder = (req, res) => {

    Order.exists({ _id: req.params.id }, (err, result) => {
    if(err) {
      return res.status(400).json(err)
    }
    else {

      if(result) {
        Order.findById(req.params.id)
          .then(order => res.status(200).json(order))
          .catch(err => res.status(500).json(err))
      }
      else {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'Ooops this order does not exist'
        })
      }
    }
  })
}






exports.createOrder = (req, res) => {
  Order.exists({ _id: req.params.id }, (err, result) => {
    if(err) {
      return res.status(500).json(err)
    } else {
      if(result) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'A order with that id already exists, please update product instead'
        })
      }
      
      const newOrder = new Order({

        user:        req.body.user,
        products:    req.body.products,
        price:       req.body.price,

      })

      newOrder.save()
        .then(() => {
          res.status(201).json({
            statusCode: 201,
            status: true,
            message: 'order created successfully'
          })
        })
        .catch(() => {
          res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'order could not be created'
          })
        })
    }
  })
}

exports.updateOrder = (req, res) => {

    Order.exists({ _id: req.params.id }, (err, result) => {
    if(err) {
      return res.status(400).json(err)
    } else {

      if(result) {
        
        Order.updateOne({ _id: req.params.id }, {
          ...req.body,
          modified: Date.now()
        })
        .then(() => {
          res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'Order updated successfully'
          })
        })
        .catch(() => {
          res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to update order'
          })
        })

      }
      else {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'Ooops this order does not exist'
        })
      }

    }
  })

}

exports.deleteOrder = (req, res) => {
  Order.exists({ _id: req.params.id }, (err, result) => {
    if(err) {
      return res.status(400).json(err)
    } 
    else {
      if(result){
        Order.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              statusCode: 200,
              status: true,
              message: 'Order deleted'
            })
          })
          .catch(() => {
            res.status(500).json({
              statusCode: 500,
              status: false,
              message: 'Failed to delete order'
            })
          })
      }
      else {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'Ooops this order does not exist'
        })
      }
    }
  })
}