const Product = require('../models/Product');

module.exports = {
  create: async (req, res) => {
    /*
      Opción 1: Generar una instancia con "new"
    */
    // const newProduct = new Product(req.body);
    // const response = await newProduct.save();

    try {
      console.log(req.body);
      const newProduct = await Product.create(req.body);
      res.status(201).json({ message: 'product created', product: newProduct });
    } catch (error) {
      res.status(400).json({ message: 'error creating product', error });
    }
  },
  findAll: async (req, res) => {
    try {
      const Products = await Product.find({ is_active: true });
      if (Products.length === 0)
        return res.status(404).json({ message: 'Products not found' });
      res.status(200).json({ message: 'Products list obtained', Products });
    } catch (error) {
      res.status(400).json({ message: 'error fetching Products', error });
    }
  },
  findOne: async (req, res) => {
    // const { idProduct } = req.params;
    const id = req.params.idProduct;
    try {
      const product = await Product.findOne({ _id: id, is_active: true });
      if (!product)
        return res.status(404).json({ message: 'product not found' });
      return res.status(200).json({ message: 'product found', product });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateOne: async (req, res) => {
    const id = req.params.idProduct;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: 'product updated', product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteOne: async (req, res) => {
    const id = req.params.idProduct;
    try {
      await Product.findByIdAndUpdate(id, { is_active: false }, { new: true });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  destroyOne: async (req, res) => {
    const id = req.params.idProduct;
    try {
      await Product.findByIdAndRemove(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
