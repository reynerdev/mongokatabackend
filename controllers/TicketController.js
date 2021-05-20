const Ticket = require('../models/Ticket');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const Aggregation = (idTicket) => {
  return [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(idTicket),
      },
    },
    {
      $unwind: {
        path: '$ticket_products',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'ticket_products',
        foreignField: '_id',
        as: 'ticket_products',
      },
    },
    {
      $unwind: {
        path: '$ticket_products',
      },
    },
    {
      $group: {
        _id: null,
        amount: {
          $sum: '$ticket_products.product_price',
        },
      },
    },
  ];
};

module.exports = {
  create: async (req, res) => {
    /*
      Opción 1: Generar una instancia con "new"
    */
    // const newTicket = new Ticket(req.body);
    // const response = await newTicket.save();

    try {
      console.log(req.body);
      const newTicket = await Ticket.create(req.body);
      res.status(201).json({ message: 'Ticket created', Ticket: newTicket });
    } catch (error) {
      res.status(400).json({ message: 'error creating Ticket', error });
    }
  },
  findAll: async (req, res) => {
    try {
      const Tickets = await Ticket.find({ is_active: true });
      if (Tickets.length === 0)
        return res.status(404).json({ message: 'Tickets not found' });
      res.status(200).json({ message: 'Tickets list obtained', Tickets });
    } catch (error) {
      res.status(400).json({ message: 'error fetching Tickets', error });
    }
  },

  findOne: async (req, res) => {
    // const { idTicket } = req.params;
    const id = req.params.idTicket;
    try {
      const Ticket_ = await Ticket.findOne({ _id: id, is_active: true });
      if (!Ticket_)
        return res.status(404).json({ message: 'Ticket not found' });
      return res.status(200).json({ message: 'Ticket found', Ticket_ });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  findOnePopulation: async (req, res) => {
    // const { idTicket } = req.params;
    const id = req.params.idTicket;
    try {
      const Ticket_ = await Ticket.findOne({
        _id: id,
        is_active: true,
      }).populate('ticket_products');
      if (!Ticket_)
        return res.status(404).json({ message: 'Ticket not found' });
      return res.status(200).json({ message: 'Ticket found', Ticket_ });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateOne: async (req, res) => {
    const id = req.params.idTicket;
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: 'Ticket updated', Ticket: updatedTicket });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteOne: async (req, res) => {
    const id = req.params.idTicket;
    try {
      await Ticket.findByIdAndUpdate(id, { is_active: false }, { new: true });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  destroyOne: async (req, res) => {
    const id = req.params.idTicket;
    try {
      await Ticket.findByIdAndRemove(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  addProductToTicket: async (req, res) => {
    const { idTicket, idProduct } = req.params;

    try {
      await Ticket.findByIdAndUpdate(idTicket, {
        $push: { ticket_products: idProduct },
      });
      res.status(204).json({ message: 'Producto Agregado' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  deleteProductFromTicket: async (req, res) => {
    const { idTicket, idProduct } = req.params;
  },

  calculateTotalTicket: async (req, res) => {
    const { idTicket } = req.params;
    try {
      const result = await Ticket.aggregate(Aggregation(idTicket));

      const subtotal = result[0].amount;
      const Iva = subtotal * 0.18;
      const total = subtotal + Iva;
      const updatedTicket = await Ticket.findByIdAndUpdate(
        idTicket,
        {
          ticket_subtotal: subtotal,
          ticket_IVA: Iva,
          ticket_total: total,
        },
        {
          new: true,
        }
      );
      res.status(204).json({ message: updatedTicket });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
