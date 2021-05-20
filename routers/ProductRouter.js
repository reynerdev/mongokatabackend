const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers');

// Create
router.post('/products', ProductController.create);

// Read (All)
router.get('/products', ProductController.findAll);

// Read (One)
router.get('/products/:idProduct', ProductController.findOne);

// Upddate (One)
router.patch('/products/:idProduct', ProductController.updateOne);

// Delete (Logical, One)
router.delete('/products/:idProduct', ProductController.deleteOne);

// Delete (Physical, One)
router.delete('/products/:idProduct/destroy', ProductController.destroyOne);

module.exports = router;
