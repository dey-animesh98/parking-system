import { useEffect, useState ,useReducer} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Booking } from './Booking'



const Form = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [vehicle_no, setVehicle_no] = useState('')
    const [duration_from, setDuration_from] = useState(new Date());
    const [duration_to, setDuration_to] = useState(new Date());
    const [success, setSuccess] = useState(false)

    // const getData = async () => {
    //     let res = await axios.get(`http://localhost:3001/get-slots`)
    // }
    // console.log(reload)

  
    // useEffect(() => {
        
    // }, [])

    const getName = (e) => {
        return setName(e.target.value)
    }

    const getEmail = (e) => {
        return setEmail(e.target.value)
    }

    const getMobile = (e) => {
        return setMobile(e.target.value)
    }

    const getVehicle_no = (e) => {
        return setVehicle_no(e.target.value)
    }




    const sendData = async () => {
        let id = props.slotNo
        let whom = {
            "name": name,
            "email": email,
            "mobile": mobile,
            "vehicle_no": vehicle_no
        }
        let res = await axios.put(`http://localhost:3001/book-slot/${id}`, {
            duration_from: duration_from,
            duration_to: duration_to,
            whom: whom
        })
        if (res) {
            setSuccess(true)
            // forceUpdate()
        }

    }

    return (
        <>
            {success ? <p className='success-msg'> Your slot is booked. Happy Parking</p> :

                <div className='form'>

                    <p className='heading'><span>Available! Book Your Slot Now</span></p>
                    <div className='date-picker'>
                        <DatePicker
                            isClearable
                            filterDate={d => {
                                return new Date() < d;
                            }}
                            placeholderText="Select check in time"
                            showTimeSelect
                            dateFormat="MMMM dd, yyyy h:mmaa"
                            selected={duration_from}
                            selectsStart
                            startDate={duration_from}
                            minDate={duration_from}
                            endDate={duration_to}
                            onChange={date => setDuration_from(date)}
                        />
                        <DatePicker
                            isClearable
                            filterDate={d => {
                                return new Date() < d;
                            }}
                            showTimeSelect
                            placeholderText="Select check out time"
                            dateFormat="MMMM dd, yyyy h:mmaa"
                            selected={duration_to}
                            selectsEnd
                            startDate={duration_from}
                            endDate={duration_to}
                            minDate={duration_from}
                            onChange={date => setDuration_to(date)}
                        />
                    </div>

                    <form className="booking-form">

                        <input className="register-form" name="name" type='text' placeholder="Enter name" value={name} onChange={getName} />
                        <input className="register-form" name="email" type='email' placeholder="Enter email" value={email} onChange={getEmail} />
                        <input className="register-form" name="mobile" type='text' placeholder="Enter mobile no" value={mobile} onChange={getMobile} />
                        <input className="register-form" name="vehicle_no" type='text' placeholder="Enter Vehicle no" value={vehicle_no} onChange={getVehicle_no} />
                        <button type="button" className="btn btn-submit" onClick={sendData}>Confirm Booking</button>

                    </form>

                </div>
            }
        </>
    )
}

export default Form

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