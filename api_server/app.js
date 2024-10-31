const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Load and parse the YAML file
const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'));

// Serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory data storage (for demo purposes)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// CRUD Routes
// Create
app.post('/api/v1/items', (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all
app.get('/api/v1/items', (req, res) => {
  res.json(items);
});

// Read one
app.get('/api/v1/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Update
app.put('/api/v1/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete
app.delete('/api/v1/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
