const connectToMongo = require('./db');
const express = require('express');

const app = express();
connectToMongo();

const port = process.env.PORT || 5001; // Use process.env.PORT if available, else default to 5001
const cors = require('cors');

const corsOptions = {
    origin: 'https://secretscript.web.app',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
