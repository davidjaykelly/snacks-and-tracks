const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//import routes
const userRoutes = require('./routes/user');
const spotifyRoutes = require('./routes/spotify');
const edamamRoutes = require('./routes/edamam');
const albumRoutes = require('./routes/albums');

//app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/user', userRoutes);
app.use('/api/spotify', spotifyRoutes);
app.use('/api/edamam', edamamRoutes);
app.use('/api/albums', albumRoutes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));