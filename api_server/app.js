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

// Updated in-memory data storage
let records = [
  {
    timestamp: "2024-10-31T14:30:00Z",
    Author: "Jane Doe",
    AuthorID: "A123456",
    category: "Incident",
    summary: "A brief summary of the incident.",
    system: "Payment Gateway",
    "Affected Objects": "Transaction Records",
    "changed Values": "Status updated from pending to completed",
    "IP address": "192.168.1.1",
    Method: "POST",
    Node: "Node-1",
    "extra Attributes": {
      Severity: "High",
      Tags: ["urgent", "finance"]
    }
  }
];

// CRUD Routes for Records
// Create
app.post('/api/v1/records', (req, res) => {
  const newRecord = { id: records.length + 1, ...req.body };
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Read all
app.get('/api/v1/records', (req, res) => {
  res.json(records);
});

// Read one
app.get('/api/v1/records/:id', (req, res) => {
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (record) {
    res.json(record);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// Update
app.put('/api/v1/records/:id', (req, res) => {
  const record = records.find(r => r.id === parseInt(req.params.id));
  if (record) {
    Object.assign(record, req.body);
    res.json(record);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// Delete
app.delete('/api/v1/records/:id', (req, res) => {
  const recordIndex = records.findIndex(r => r.id === parseInt(req.params.id));
  if (recordIndex !== -1) {
    records.splice(recordIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
