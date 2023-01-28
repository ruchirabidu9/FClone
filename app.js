const config = require('config');
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const categories = require('./routes/categories');
const products = require('./routes/products');
const users = require('./routes/users');
const authe = require('./routes/authe');

const corsOptions = {
  origin: "http://localhost:5000"
};

if (!config.get('jwtPrivateKey')) {
  console.error('Fatal error: jwtPrivateKey is not defined ');
  process.exit(1);
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/categories', categories);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/authe', authe);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));