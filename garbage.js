
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

        /*
// const [duration_from, setDuration_from] = useState('')
    // const [duration_to, setDuration_to] = useState('')

    // const getDuration_from = (e) => {
    //     return setDuration_from(e.target.value)
    // }

    // const getDuration_to = (e) => {
    //     return setDuration_to(e.target.value)
    // }

    

             // <div className='from'>
                //     <label htmlFor="start">From</label>
                //     <input id="start" className='dates' name="duration_from" type="datetime-local" value={duration_from} onChange={getDuration_from} />
                // </div>

                // <div className='to'>
                //     <label htmlFor="end">To</label>
                //     <input id="end" className='dates' name="duration_to" type="datetime-local" value={duration_to} onChange={getDuration_to} />
                // </div> 
*/

/*
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

*/


/* #start, #end{
  height: 25px;
  margin: 5px;
  font: 1rem 'Fira Sans', sans-serif;
}
label{
  margin-right: 3px;
}
.to label{
  margin-right: 23px;
} */