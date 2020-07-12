const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
 

exports.create = (req, res) => {
    // console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        } else {
            return res.status(201).send(req.body);
        }
    });
};



        