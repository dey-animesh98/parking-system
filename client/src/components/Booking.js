import axios from 'axios'
import { useEffect, useState } from 'react'
import Form from './Form'

const Booking = () => {

    const [isBooked, setIsBooked] = useState(false)
    const [showForm, setShowFrom] = useState(false)
    const [selectedSLot, setSelectedSlot] = useState('')
    const [slotWaiting, setSlotWaiting] = useState('')
    const [available, setAvailable] = useState(false)
    const [waitingTime, setWaitingTime] = useState("")
    const [earliestSlot, setEarliestSlot] = useState('')

    const [slotarr, setSlotarr] = useState([])

    const [vacant1, setVacant1] = useState(true)
    const [vacant2, setVacant2] = useState(true)
    const [vacant3, setVacant3] = useState(true)
    const [vacant4, setVacant4] = useState(true)
    const [vacant5, setVacant5] = useState(true)
    const [vacant6, setVacant6] = useState(true)
    const [vacant7, setVacant7] = useState(true)
    const [vacant8, setVacant8] = useState(true)
    const [vacant9, setVacant9] = useState(true)
    const [vacant10, setVacant10] = useState(true)


    // const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)


    useEffect(() => {

        const isAllBooked = async () => {

            let bookingData = await axios.get(`http://localhost:3001/current-slots`)
            if (bookingData['data']['slots']['Available_Slots'] > 0) {
                setAvailable(true)

            } else {

                let min_waiting_time = await axios.get(`http://localhost:3001/min-waiting-time`)
                setWaitingTime(min_waiting_time['data']['data']['your_min_waiting_time'])
                setEarliestSlot(min_waiting_time['data']['data']['slot_id_will'])
            }
        }

        isAllBooked()
        getSlots()

    }, [])


    const getSlots = async () => {

        let res = await axios.get(`http://localhost:3001/get-slots`)
        setSlotarr(res.data.slots)
    }

    const getStatus = async (id, isVacant) => {
        
        setSelectedSlot(id)

        if (isVacant) {

            setShowFrom(true)
            setIsBooked(false)

        } else {

            setShowFrom(false)
            setIsBooked(true)

            let waitTime = await axios.get(`http://localhost:3001/waiting-time/${id}`)
            setSlotWaiting(waitTime.data['data']['waiting_time'])

        }
    }

    return (
        <>

            <h2 className='title'>Book the slot for you car in a click!! </h2>
            <div className='main'>


                <div className="grid">


                    {
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

                {
                    available
                        ?
                        <p className='available-box'>Slots are Available Now</p>
                        :
                        <p className='min-waiting'>
                            <span>Currently not available</span>
                            <br />
                            <span>Min waiting time - {waitingTime} </span>
                            <br />
                            <span>For Slot no - {earliestSlot} </span>
                        </p>
                }


                {showForm ? <Form slotNo={selectedSLot} /> : ""}

                {
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


// const getStatus2 = async () => {
//     setSelectedSlot(2)

//     if (vacant2) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/2`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus3 = async () => {
//     setSelectedSlot(3)
//     if (vacant3) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/3`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus4 = async () => {
//     setSelectedSlot(4)
//     if (vacant4) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/4`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus5 = async () => {
//     setSelectedSlot(5)
//     if (vacant5) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/5`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus6 = async () => {
//     setSelectedSlot(6)
//     if (vacant6) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/6`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus7 = async () => {
//     setSelectedSlot(7)
//     if (vacant7) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/7`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }

// const getStatus8 = async () => {
//     setSelectedSlot(8)
//     if (vacant8) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/8`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }

// const getStatus9 = async () => {
//     setSelectedSlot(9)
//     if (vacant9) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/9`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }
// const getStatus10 = async () => {
//     setSelectedSlot(10)
//     if (vacant10) {
//         setShowFrom(true)
//         setIsBooked(false)
//     } else {
//         setIsBooked(true)
//         setShowFrom(false)
//         let waitTime = await axios.get(`http://localhost:3001/waiting-time/10`)
//         setSlotWaiting(waitTime.data['data']['waiting_time'])
//     }
// }


{/* // <div key={s.data['slots'][0].slotId} className={vacant1 ? "slot slot-1 slot-vacant" : "slot slot-1 slot-booked"}>
                    //     <h3>{s.data['slots'][0].slotId}</h3>
                    // </div>)} */}


// {
//     slots.map((slot) => (
//         <div className="blog__item--container" key={slot.id}></div>
//     ))
// }

{/* <div className={vacant1 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(1, vacant1)}>1</div>
                    <div className={vacant2 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(2, vacant2)}>2</div>
                    <div className={vacant3 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(3, vacant3)}>3</div>
                    <div className={vacant4 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(4, vacant4)}>4</div>
                    <div className={vacant5 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(5, vacant5)}>5</div>
                    <div className={vacant6 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(6, vacant6)}>6</div>
                    <div className={vacant7 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(7, vacant7)}>7</div>
                    <div className={vacant8 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(8, vacant8)}>8</div>
                    <div className={vacant9 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(9, vacant9)}>9</div>
                    <div className={vacant10 ? "slot slot-vacant" : "slot slot-booked"} onClick={() => getStatus1(10, vacant10)}>10</div> */}


        // if (res.data['slots'][0].status === "Booked") setVacant1(false)

        // if (res.data['slots'][1].status === "Booked") setVacant2(false)

        // if (res.data['slots'][2].status === "Booked") setVacant3(false)

        // if (res.data['slots'][3].status === "Booked") setVacant4(false)

        // if (res.data['slots'][4].status === "Booked") setVacant5(false)

        // if (res.data['slots'][5].status === "Booked") setVacant6(false)

        // if (res.data['slots'][6].status === "Booked") setVacant7(false)

        // if (res.data['slots'][7].status === "Booked") setVacant8(false)

        // if (res.data['slots'][8].status === "Booked") setVacant9(false)

        // if (res.data['slots'][9].status === "Booked") setVacant10(false)