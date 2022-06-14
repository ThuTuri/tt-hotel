import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  duration: 1000
});


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
        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }
        try {
            setLoading(true)
            axios.post('http://localhost:5000/api/rooms/get-room-by-id', {
                roomid: roomid
            })
                .then(response => {
                    if (response) {
                        const data = response.data;
                        setRoom(data)
                        setTotalAmount(data.rentPerDay * totalDays)
                    }

                    setLoading(false)
                })


        } catch (error) {
            setLoading(false);
            setError(true)
        }
    }, [])



    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }

        try {
            setLoading(true);
            const result = await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails)
            setLoading(false);
            Swal.fire('Congratulations!', 'Your Room Booked Successfully', 'success').then(result=>{
                window.location.href='/bookings'
            })
        } catch (error) {
            setLoading(false);
            Swal.fire('OOps!', 'Something went wrong', 'error')
        }
    }

    return (
        <div className='m-5' data-aos='flip-left'>
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
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>From Date: {fromDate}</p>
                                <p>To Date: {toDate} </p>
                                <p>Max Count: {room.maxCount}</p>
                            </b>


                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days: {totalDays}  </p>
                                <p>Rent per day: {room.rentPerDay}</p>
                                <p>Total Amount: {totalAmount}</p>
                            </b>

                        </div>
                        <div style={{ float: 'right' }}>
                            <StripeCheckout
                                amount={totalAmount * 100}
                                token={onToken}
                                currency="USD"
                                stripeKey="pk_test_51LA9R5AiMh1ZupZJ9uO7biufniJogLzXGoeI6CljGVukmvUs7j9Gm5N0QgkebNjmHQR8TC6jBplur0wTpttHwdUC00doOXhCD7"
                            >
                                <button className='btn'>Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    )
}

export default BookingScreen;