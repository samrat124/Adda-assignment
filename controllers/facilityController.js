const { Facility, facilities } = require('../models/facilityModel');

// const facilities = [
//   new Facility('Clubhouse', {
//     '10:00 - 16:00': 100,
//     '16:00 - 22:00': 500,
//   }),
//   new Facility('Tennis Court', {
//     '00:00 - 23:59': 50,
//   }),
// ];

function bookFacility(req, res) {
  const { facility, date, slot } = req.body;

  const selectedFacility = facilities.find((f) => f.name === facility);

  if (!selectedFacility) {
    return res.status(400).json({ message: 'Invalid facility' });
  }

  const bookingKey = date + '-' + slot;
  const isSlotAvailable = selectedFacility.bookings[bookingKey] === undefined;

  if (isSlotAvailable) {
    const amount = selectedFacility.slots[slot];
    selectedFacility.bookings[bookingKey] = amount;
    return res.status(200).json({ message: 'Booked', amount });
  } else {
    return res.status(400).json({ message: 'Booking Failed, Already Booked' });
  }
}

function updateBooking(req, res) {
  const { facility, date, slot, newSlot } = req.body;

  const selectedFacility = facilities.find((f) => f.name === facility);

  if (!selectedFacility) {
    return res.status(400).json({ message: 'Invalid facility' });
  }

  const isSlotAvailable = selectedFacility.bookings[newSlot] === undefined;

  if (isSlotAvailable) {
    if (selectedFacility.bookings[slot]) {
      const amount = selectedFacility.slots[newSlot];
      selectedFacility.bookings[newSlot] = amount;
      delete selectedFacility.bookings[slot];
      return res.status(200).json({ message: 'Booking updated successfully', amount });
    } else {
      return res.status(400).json({ message: 'Cannot update booking, slot is not booked' });
    }
  } else {
    return res.status(400).json({ message: 'Booking Failed, Slot already booked for the new time' });
  }
}

function cancelBooking(req, res) {
  const { facility, date, slot } = req.body;

  const selectedFacility = facilities.find((f) => f.name === facility);

  if (!selectedFacility) {
    return res.status(400).json({ message: 'Invalid facility' });
  }

  if (selectedFacility.bookings[slot]) {
    delete selectedFacility.bookings[slot];
    return res.status(200).json({ message: 'Booking canceled successfully' });
  } else {
    return res.status(400).json({ message: 'Cannot cancel booking, slot is not booked' });
  }
}

module.exports = {
  bookFacility,
  updateBooking,
  cancelBooking,
};
