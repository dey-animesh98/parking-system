const express = require('express');
const router = express.Router();

const bookingController = require('../Controllers/bookingController')

//Create slot
router.post('/create-slot', bookingController.createSlot)

//Get slot list
router.get('/get-slots', bookingController.fetchSlots)

//Get Available slot list
router.get('/current-slots', bookingController.curretAvailbleSlots)

//Book slot
router.put('/book-slot/:id', bookingController.bookSlot)

//Availing Slot
router.put('/avail-slot/:id', bookingController.updateSlotToAvailable)

router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: "URL Not Found" })
})

module.exports = router