const BookingModel = require('../Models/bookingModel')
const util = require('../Utils/validation')


// -----------------Create Slot ----------------------//

const createSlot = async function (req, res) {
    try {

        const getCount = await BookingModel.find().count()

        let data = {}
        data['slotId'] = getCount + 1

        const createSlot = await BookingModel.create(data)
        return res.status(201).send({ status: true, message: "Slot created", data: createSlot })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
};


// ----------------- Fetch Slot ----------------------//

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
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }
}


// ----------------- Available Slot ----------------------//

const curretAvailbleSlots = async function (req, res) {
    try {

        //Getting slots data
        const availableSlotCount = await BookingModel.find({ status: "Available" }).count()

        //If no slots available
        if (availableSlotCount === 0)
            return res.status(200).send({ status: true, message: "Currently no slots available", clickHere: "http://localhost:3000/min-waiting-time" })

        let slotCountData = {
            Available_Slots: availableSlotCount,
            Booked_Slots: 10 - availableSlotCount
        }
        //If slots available
        return res.status(200).send({ status: true, slots: slotCountData })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }
}


// ----------------- Book Slot ----------------------//

const bookSlot = async function (req, res) {
    try {
        const slotId = req.params.id
        //Find the slot 
        const slot = await BookingModel.findOne({ slotId: slotId })

        if (!slot) return res.status(400).send({ status: false, message: "Enter a valid slot id" })
        if (slot.status === "Booked") return res.status(400).send({ status: false, message: "This slot is already booked. Select an another slot" })

        const data = req.body
        const { duration_to, duration_from, whom } = data

        const present_date = Math.round(Date.now() / 1000)

        //Duration start
        const duration_start = new Date(duration_from)
        const duration_start_seconds = duration_start.getTime() / 1000;

        //Advance booking limit
        const total_dur_secs = duration_start_seconds - present_date
        const total_dur_hrs = (Math.floor(total_dur_secs / 3600))
        if (total_dur_hrs > 6) return res.status(400).send({ status: false, message: "Advance booking must be within next 6 hours" })

        //Date validation
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
        const userVehicle = whom.vehicle_no

        //upadating slot data for booking

        slot.status = "Booked"
        slot.duration = get_duration
        slot.duration_from = duration_start_seconds
        slot.duration_to = duration_end_seconds
        slot.whom.name = userName
        slot.whom.email = userEmail
        slot.whom.mobile = userMobile
        slot.whom.vehicle_no = userVehicle


        await slot.save()

        return res.status(200).send({ status: true, message: "You slot booked", data: slot })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });

    }

}

//--------------------------Update slot status to available---------------------------//

const updateSlotToAvailable = async function (req, res) {
    try {
        const slotId = req.params.id
        //Find the slot 
        const slot = await BookingModel.findOne({ slotId: slotId })

        if (!slot) return res.status(400).send({ status: false, message: "Enter a valid slot id" })
        if (slot.status === "Available") return res.status(400).send({ status: false, message: "This slot is already Available" })

        //Change status & other details

        slot.status = "Available"
        slot.duration = null
        slot.duration_from = null
        slot.duration_to = null
        slot.whom.name = null
        slot.whom.email = null
        slot.whom.mobile = null
        slot.whom.vehicle_no = null

        await slot.save()
        return res.status(200).send({ status: true, message: "Slot availed", data: slot })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
}

//---------------------Min waiting time----------------------------//

const getMinWaitingTime = async function (req, res) {
    try {
        //Getting slots data
        const availableSlotCount = await BookingModel.find({ status: "Available" }).count()

        //If no slots available
        if (availableSlotCount !== 0)
            return res.status(200).send({ status: true, message: "slots are available now", clickToCheck: "http://localhost:3000/get-slots?status=Available" })

        //Finding minimum time 
        const groupedData = await BookingModel.find().sort({ duration_to: 1 }).limit(1)

        const present_date = Math.round(Date.now() / 1000)
        const min_time_secs = groupedData[0]['duration_to']
        const waiting_time_secs = min_time_secs - present_date
        const waiting_time_hrs = util.convert_sec_to_hr(waiting_time_secs)

        const result = {
            your_min_waiting_time: waiting_time_hrs,
            slot_id_will: groupedData[0].slotId
        }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
}


//---------------------Min waiting time for particular slots----------------------//

const getMinWaitingTimeById = async function (req, res) {
    try {
        const slotId = req.params.id

        //Getting slots data
        const slot = await BookingModel.findOne({ slotId: slotId })
        if (slot.status === "Available") return res.status(200).send({ status: true, message: "Slot is available" })

        const present_date = Math.round(Date.now() / 1000)
        const min_time_secs = slot['duration_to']
        const waiting_time_secs = min_time_secs - present_date
        const waiting_time_hrs = util.convert_sec_to_hr(waiting_time_secs)

        const result = {
            waiting_time: waiting_time_hrs
        }

        return res.status(200).send({ status: true, data: result })

    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
}
module.exports = { createSlot, fetchSlots, curretAvailbleSlots, bookSlot, updateSlotToAvailable, getMinWaitingTime, getMinWaitingTimeById }


 // .aggregate([
        //     {
        //         $group: { _id:"$slotId", minTime: { $min: "$duration_to" }, }
        //     }
        // ])//.limit(1)
        // console.log(groupedData)