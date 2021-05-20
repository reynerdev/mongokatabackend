const express = require('express');
const router = express.Router();
const ProductRouter = require('./ProductRouter');
const TicketRouter = require('./TicketRouter');
const UserRouter = require('./UserRouter');

router.use(ProductRouter);
router.use(TicketRouter);
router.use(UserRouter);

module.exports = router;
