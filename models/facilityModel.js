const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slots: { type: Object, required: true },
  bookings: { type: Object, default: {} },
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
