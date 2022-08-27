import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from './Form'

const Booking = () => {

    //Hooks
    const [slotarr, setSlotarr] = useState([])
    const [isBooked, setIsBooked] = useState(false)
    const [showForm, setShowFrom] = useState(false)
    const [selectedSLot, setSelectedSlot] = useState('')
    const [slotWaiting, setSlotWaiting] = useState('')
    const [available, setAvailable] = useState(false)
    const [unavailable, setUnavailable] = useState(false)
    const [waitingTime, setWaitingTime] = useState("")
    const [earliestSlot, setEarliestSlot] = useState('')



    useEffect(() => {

        const isAllBooked = async () => {

            //If min 1 slot is available
            let bookingData = await axios.get(`https://vehicle-park.herokuapp.com/current-slots`)
            if (bookingData['data']['slots']['Available_Slots'] > 0) {
                setAvailable(true)
                setUnavailable(false)

            } else {

                //If no slots available
                let min_waiting_time = await axios.get(`https://vehicle-park.herokuapp.com/min-waiting-time`)
                setWaitingTime(min_waiting_time['data']['data']['your_min_waiting_time'])
                setEarliestSlot(min_waiting_time['data']['data']['slot_id_will'])
                setAvailable(false)
                setUnavailable(true)
            }
        }

        isAllBooked()
        getSlots()

    }, [])


    //Fetching all slots data
    const getSlots = async () => {

        let res = await axios.get(`https://vehicle-park.herokuapp.com/get-slots`)
        setSlotarr(res.data.slots)
    }

    //Book the slots by id
    const getStatus = async (id, isVacant) => {

        setSelectedSlot(id)

        //If selected slot is available show from
        if (isVacant) {

            setShowFrom(true)
            setIsBooked(false)

        } else {

            //If not will show error dialog box
            setShowFrom(false)
            setIsBooked(true)

            let waitTime = await axios.get(`https://vehicle-park.herokuapp.com/waiting-time/${id}`)
            setSlotWaiting(waitTime.data['data']['waiting_time'])

        }
    }

    //Conditional HTML 
    return (
        <>

            <h2 className='title'>Book the slot for you car in a click!! </h2>
            <div className='main'>


                <div className="grid">


                    {//Mapping of slots

                        slotarr.map((slot) => (
                            <div
                                className={slot.status === 'Available' ? "slot slot-vacant" : "slot slot-booked"}
                                key={slot.slotId}
                                onClick={() => getStatus(slot.slotId, slot.status === 'Available')}>
                                {slot.slotId}

                            </div>
                        ))
                    }


                </div>

                {//Slot avability

                    available
                        ?
                        <p className='available-box'>Slots are Available Now</p>
                        :
                        ""
                }


                {
                    unavailable
                        ?
                        <p className='min-waiting'>
                            <span>Currently not available</span>
                            <br />
                            <span>Min waiting time - {waitingTime} </span>
                            <br />
                            <span>For Slot no - {earliestSlot} </span>
                        </p>
                        :
                        ""
                }


                {showForm ? <Form slotNo={selectedSLot} reload={getSlots} formVis={showForm} /> : ""}

                {//Error dialoge box

                    isBooked
                        ?
                        <p className='slot-booked-msg'>
                            <span>Slot {selectedSLot} Booked,</span> <br />
                            <span> Please select another!</span> <br />
                            <span>Waiting Time - {slotWaiting} </span>
                        </p>
                        : ""
                }

            </div>
        </>
    )
}

export default Booking

