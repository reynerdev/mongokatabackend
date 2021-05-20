const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticket_subtotal: {
    type: Number,
    default: 0,
  },
  ticket_IVA: {
    type: Number,
    default: 0,
  },
  ticket_total: {
    type: Number,
    default: 0,
  },
  ticket_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  is_active: {
    type: Boolean,
    default: true,
  },
});

// We create the model Product which will allow us to
// intereact with colecction Producs

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
