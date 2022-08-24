const BookingModel = require('../Models/bookingModel')
const util = require('../Utils/validation')



const createSlot = async function (req, res) {
    try {

        const getCount = await BookingModel.find().count()

        let data = {}
        data['slotId'] = getCount + 1

        const createSlot = await BookingModel.create(data)
        return res.status(201).send({ status: true, message: "Slot created", data: createSlot })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
};

const fetchSlots = async function (req, res) {
    try {
        const getStatus = req.query.status

        let filter = {}
        //If query is coming assing query
        if (getStatus) {
            filter['status'] = getStatus
        }

        //Getting slots data
        const getAllSlot = await BookingModel.find(filter)

        //If no slots available
        if (getAllSlot.length === 0)
            return res.status(200).send({ status: true, message: "Currently no slots available", clickHere: "http://localhost:3000/check-waiting-time" })

        //If slots available
        return res.status(200).send({ status: true, slots: getAllSlot })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }
}

const curretAvailbleSlots = async function (req, res) {
    try {

        //Getting slots data
        const availableSlotCount = await BookingModel.find({ status: "Available" }).count()

        //If no slots available
        if (availableSlotCount === 0)
            return res.status(200).send({ status: true, message: "Currently no slots available", clickHere: "http://localhost:3000/check-waiting-time" })

        let slotCountData = {
            Available_Slots: availableSlotCount,
            Booked_Slots: 10 - availableSlotCount
        }
        //If slots available
        return res.status(200).send({ status: true, slots: slotCountData })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }
}

const bookSlot = async function (req, res) {
    try {
        const slotId = req.params.id
        //Find the slot 
        const slot = await BookingModel.findOne({ slotId: slotId })

        if (!slot) return res.status(400).send({ status: false, message: "Enter a valid slot id" })
        if (slot.status === "Booked") return res.status(400).send({ status: false, message: "Slot is alresdy booked. Select an another slot" })

        const data = req.body
        const { duration_to, duration_from, whom } = data

        const present_date = Math.round(Date.now() / 1000)

        //Duration start
        const duration_start = new Date(duration_from)
        const duration_start_seconds = duration_start.getTime() / 1000;

        if (duration_start_seconds < present_date)
            return res.status(400).send({ status: false, message: "Please enter a valid for booking start" })


        //Duration End
        const duration_end = new Date(duration_to)
        const duration_end_seconds = duration_end.getTime() / 1000;

        if (duration_end_seconds < duration_start_seconds || duration_end_seconds < present_date)
            return res.status(400).send({ status: false, message: "Please enter a valid for booking end" })


        const duration_in_seceonds = duration_end_seconds - duration_start_seconds
        const get_duration = util.convert_sec_to_hr(duration_in_seceonds)

        const userName = whom.name
        const userEmail = whom.email
        const userMobile = whom.mobile

        //upadating slot data for booking

        slot.status = "Booked"
        slot.duration = get_duration
        slot.duration_from = duration_start_seconds
        slot.duration_to = duration_end_seconds
        slot.whom.name = userName
        slot.whom.email = userEmail
        slot.whom.mobile = userMobile

        await slot.save()

        return res.status(200).send({ status: true, message: "You slot booked", data: slot })

        /*
        const duration_in_hours = Math.round(duration_in_seceonds / 3600)
        if (duration_in_hours < 1) return res.status(400).send({ status: false, message: "Minimum booking hours is 1 hr" })
        if (duration_in_hours > 24) return res.status(400).send({ status: false, message: "Maximum booking hours is 24 hrs" })
*/


    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }

}

//Update slot status to available

const updateSlotToAvailable = async function (req, res) {
    try {
        const slotId = req.params.id
        //Find the slot 
        const slot = await BookingModel.findOne({ slotId: slotId })

        if (!slot) return res.status(400).send({ status: false, message: "Enter a valid slot id" })
        if (slot.status === "Available") return res.status(400).send({ status: false, message: "This Slot is alresdy Available" })
        
    } catch (err) {
        
    }
}


module.exports = { createSlot, fetchSlots, curretAvailbleSlots, bookSlot, updateSlotToAvailable }