import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';


function BookingScreen() {
    const [loading, setLoading] = useState();
    const [error, setError] = useState(false);
    const [room, setRoom] = useState({});

    const { roomid } = useParams();
    const { fromDate, toDate } = useParams();
    const startDate = moment(fromDate, 'DD-MM-YYYY')
    const endDate = moment(toDate, 'DD-MM-YYYY')

    const totalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;
    const [totalAmount, setTotalAmount] = useState()

    useEffect(() => {
        try {
            setLoading(true)
            axios.post('http://localhost:5000/api/rooms/get-room-by-id', {
                roomid: roomid
            })
                .then(response => {
                    if (response) {
                        const data = response.data;
                        setRoom(data)
                        setTotalAmount(data.rentperday * totalDays)
                    }
                    
                    setLoading(false)
                })


        } catch (error) {
            setLoading(false);
            setError(true)
        }
    }, [])

  async function bookRoom(){
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays
        }

        try {
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails)
        } catch (error) {
            
        }
    }

    return (
        <div className='m-5'>
            {loading ? (<h1><Loader /></h1>) : room ? (<div>
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls?.length > 0 ? room.imageurls[0] : ''} className='bigimg' />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: 'right' }}>

                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: </p>
                                <p>From Date: {fromDate}</p>
                                <p>To Date: {toDate} </p>
                                <p>Max Count: {room.maxcount}</p>
                            </b>


                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days: {totalDays}  </p>
                                <p>Rent per day: {room.rentperday}</p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>

                        </div>
                        <div style={{ float: 'right' }}>
                            <button className='btn' onClick={bookRoom}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    )
}

export default BookingScreen;