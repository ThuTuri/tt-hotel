import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Tag } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;
function Profilescreen() {


    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>

        </div>
    )
}

export default Profilescreen;


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        try {
            setLoading(true)
            const rooms = axios.post('http://localhost:5000/api/bookings/get-bookings-by-user-id', { userid: user._id })
                .then(response => {
                    if (response) {
                        const data = response.data;
                        console.log(data);
                        setBookings(data)
                    }
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }, [])

    async function cancelBooking(bookingid, roomid) {

        try {
            setLoading(true)
            const result = await (await axios.post("/api/bookings/cancel-booking", { bookingid, roomid })).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('OOps', 'Something went wrong', 'error')
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>BookingId</b>: {booking._id} </p>
                            <p><b>CheckIn</b>: {moment(booking.fromDate).format('DD-MM-YYYY')} </p>
                            <p><b>CheckOut</b>: {moment(booking.toDate).format('DD-MM-YYYY')} </p>
                            <p><b>Amount</b>: {booking.totalAmount} </p>
                            <p><b>Status</b>: {" "}{booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>) } </p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn' onClick={() => cancelBooking(booking._id, booking.roomid)}>CANCEL BOOKING</button>
                                </div>
                            )}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}