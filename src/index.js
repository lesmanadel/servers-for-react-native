require('./models/User')
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:drowssap@cluster0.px8xp.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParse: true,
  useCreateIndex: true
})
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connection to mongo', err);
});


app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
});

app.listen(3000, () => {
  console.log('listening on 3000')
});
