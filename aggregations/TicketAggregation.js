const mongoose = require('mongoose');
module.exports = {
  sumOfProductByTicket: (idTicket) => {
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
  },
};
