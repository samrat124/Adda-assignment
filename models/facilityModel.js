class Facility {
  constructor(name, slots) {
    this.name = name;
    this.slots = slots;
    this.bookings = {};
  }
}

const facilities = [
  new Facility('Clubhouse', {
    '10:00 - 16:00': 100,
    '16:00 - 22:00': 500,
  }),
  new Facility('Tennis Court', {
    '00:00 - 23:59': 50,
  }),
];

module.exports = {
  Facility,
  facilities,
};
