const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Facility = require('./models/facilityModel');
const { bookFacility } = require('./controllers/bookingController');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/facility_bookings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Initialize facilities in the database
    return Facility.create([
      {
        name: 'Clubhouse',
        slots: {
          '10:00 - 16:00': 100,
          '16:00 - 22:00': 500,
        },
        bookings: {},
      },
      {
        name: 'Tennis Court',
        slots: {
          '00:00 - 23:59': 50,
        },
        bookings: {},
      },
    ]);
  })
  .then(() => {
    console.log('Facilities initialized in the database');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// API endpoint for booking a facility
app.post('/book', bookFacility);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
