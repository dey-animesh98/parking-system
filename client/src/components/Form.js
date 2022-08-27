import { useState, } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";




const Form = (props) => {

    //Hooks
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [vehicle_no, setVehicle_no] = useState('')
    const [duration_from, setDuration_from] = useState(new Date());
    const [duration_to, setDuration_to] = useState(new Date());
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")



    //Collecting Input
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


    //Send data to sever
    const sendData = async () => {
        let id = props.slotNo
        let whom = {
            "name": name,
            "email": email,
            "mobile": mobile,
            "vehicle_no": vehicle_no
        }
        try {
            let res = await axios.put(`https://vehicle-park.herokuapp.com/book-slot/${id}`, {
                duration_from: duration_from,
                duration_to: duration_to,
                whom: whom
            })

            if (res) {
                setSuccess(true)
                setError(false)
                setTimeout(() => {
                    props.reload()
                    setSuccess(false)
                }, 3000);
                

            }

        } catch (err) {
            setError(true)
            setErrorMsg(err.response.data.message)
        }


    }


    //Conditional HTML 
    return (
        <>

            {success
                ?
                <p className='success-msg'>
                    <span> Hello {name}, Slot {props.slotNo} is booked for you.</span><br />
                    <span> Please wait while we are saving your data.</span> <br />
                    <span>Happy Parking!!</span>
                </p>
                :

                <div className='form'>

                    <p className='heading'><span>Available! Book Your Slot {props.slotNo} Now</span></p>
                    <div className='date-picker'>

                        <DatePicker
                            isClearable
                            filterDate={d => {
                                return new Date() < d;
                            }}
                            showTimeSelect
                            placeholderText="Select check in time"
                            dateFormat="MMMM dd, yyyy h:mmaa"
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="Time"
                            selected={duration_from}
                            selectsStart
                            startDate={duration_from}
                            minDate={new Date()}
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
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="Time"
                            selected={duration_to}
                            selectsEnd
                            startDate={new Date()}
                            minDate={duration_from}
                            endDate={duration_to}
                            onChange={date => setDuration_to(date)}
                        />
                    </div>

                    <form className="booking-form">

                        <input className="register-form" name="name" type='text' placeholder="Enter name*" value={name} onChange={getName} />
                        <input className="register-form" name="email" type='email' placeholder="Enter email*" value={email} onChange={getEmail} />
                        <input className="register-form" name="mobile" type='text' placeholder="Enter mobile no*" value={mobile} onChange={getMobile} />
                        <input className="register-form" name="vehicle_no" type='text' placeholder="Enter Vehicle no*" value={vehicle_no} onChange={getVehicle_no} />
                        <button type="button" className="btn btn-submit" onClick={sendData}>Confirm Booking</button>

                    </form>
                    {error
                        ?
                        <p className='bad-req-msg'>{errorMsg}</p> : ""}
                </div>
            }
        </>
    )
}

export default Form