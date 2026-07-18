const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Bismillah Wall Art", price: 25, category: "Islamic Art" },
  { id: 2, name: "Elhamdulillah Kitchen Set", price: 30, category: "Islamic Art" },
  { id: 3, name: "Geometric Wood Panel", price: 40, category: "Wood Decor" },
  { id: 4, name: "Acrylic Name Frame", price: 20, category: "Custom" },
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET one product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST new product
app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
