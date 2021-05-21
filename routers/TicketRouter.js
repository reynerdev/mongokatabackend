const express = require('express');
const router = express.Router();
const { TicketController } = require('../controllers');

// Create
router.post('/tickets', TicketController.create);

// Read (All)
router.get('/tickets', TicketController.findAll);

// Read (One)
router.get('/tickets/:idTicket', TicketController.findOnePopulation);

// Upddate (One)
router.patch('/tickets/:idTicket', TicketController.updateOne);

// Delete (Logical, One)
router.delete('/tickets/:idTicket', TicketController.deleteOne);

// Delete (Physical, One)
router.delete('/tickets/:idTicket/destroy', TicketController.destroyOne);

// Add products to a ticket ID
router.post(
  '/tickets/:idTicket/products/:idProduct',
  TicketController.addProductToTicket
);

// Delete product from a ticket
router.delete(
  '/tickets/:idTicket/products/:idProduct',
  TicketController.deleteProductFromTicket
);

router.patch(
  '/tickets/:idTicket/calculate',
  TicketController.calculateTotalTicket
);

module.exports = router;
