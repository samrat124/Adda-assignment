const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');

router.post('/book', facilityController.bookFacility);
router.put('/update', facilityController.updateBooking);
router.delete('/cancel', facilityController.cancelBooking);

module.exports = router;
