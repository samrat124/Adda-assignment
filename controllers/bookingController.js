const Facility = require('../models/facilityModel');

async function bookFacility(req, res) {
  const { facility, date, slot } = req.body;

  try {
    const selectedFacility = await Facility.findOne({ name: facility });

    if (!selectedFacility) {
      return res.status(400).json({ message: 'Invalid facility' });
    }

    const isSlotAvailable = selectedFacility.bookings[slot] === undefined;

    if (isSlotAvailable) {
      const amount = selectedFacility.slots[slot];
      selectedFacility.bookings[slot] = amount;
      await selectedFacility.save();
      return res.status(200).json({ message: 'Booked', amount });
    } else {
      return res.status(400).json({ message: 'Booking Failed, Already Booked' });
    }
  } catch (error) {
    console.error('Error booking facility:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  bookFacility,
};
