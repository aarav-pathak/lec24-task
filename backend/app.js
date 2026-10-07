const express = require('express');
const app = express();
const products = require('./data.js');
const PORT = process.env.PORT || 5174;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
