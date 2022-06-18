import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Tabs } from 'antd';
import Swal from 'sweetalert2';
import UpdateModal from '../components/UpdateModal';


const { TabPane } = Tabs;
function Adminscreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/home"
        }
    }, [])
    return (
        <div className='mt-3 ml-3 mr-3 mb-20 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b >Admin Panel</b></h2>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

//Bookings list

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/api/bookings/get-all-bookings")
                .then(response => {
                    if (response) {
                        const data = response.data;
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
    return (
        <div className='row '>
            <div className='col-md-12 '>

                <h1>Bookings</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered '>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromDate}</td>
                                <td>{booking.toDate}</td>
                                <td>{booking.status}</td>
                            </tr>

                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    );
}

//Rooms list

export function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState({})
    const [isShow, setShow] = useState(false);

    const getRooms = () => {

        axios.get("http://localhost:5000/api/rooms/get-all-rooms")
            .then(response => {
                if (response) {
                    const data = response.data;
                    setRooms(data)
                }

                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
                setError(error)
            })
    }

    const handleClose = () => {
        setShow(false)
        setRoom({})
        getRooms()
    };

    useEffect(() => {
        getRooms()
    }, [])



    async function handleDelete(roomid) {
        try {
            const result = await axios.delete(`http://localhost:5000/api/rooms/delete-room/${roomid}`)
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'Room deleted', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('OOps', 'Something went wrong', 'error')
        }

    }

    const getRoomDetail = (roomId) => {
        setLoading(true)
        axios.post('http://localhost:5000/api/rooms/get-room-by-id', {
            roomid: roomId
        })
            .then(response => {
                if (response) {
                    const data = response.data;
                    setRoom(data)
                    setShow(true)
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false);
                setError(true)
            })
    }

    const handleShow = (roomId) => {
        getRoomDetail(roomId)
    }

    const handleUpdate = (values) => {

        setLoading(true);
        const result = axios.post(`http://localhost:5000/api/rooms/update-room/${values.id}`, values)
            .then((response) => {
               handleClose()
            })

            setLoading(false);
            Swal.fire('Congrats', 'Your New Room Added Successfully', 'success').then(result => {
                window.location.href = "/home"
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                Swal.fire('OOps', 'Something went wrong', 'error')
            })

    }

    return (
        <div className='row'>
            <div className='col-md-12'>

                <h1>Rooms</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered'>
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentPerDay}</td>
                                <td>{room.maxCount}</td>
                                <td>{room.phoneNumber}</td>
                                <td style={{ display: 'flex' }}>
                                    <button className='btn edit mr-2' onClick={() => handleShow(room._id)}>update</button>
                                    <button className='btn delete' onClick={() => handleDelete(room._id)}>delete</button>
                                </td>
                            </tr>

                        }))}
                    </tbody>
                </table>
            </div>
            <UpdateModal room={room} isShow={isShow} handleClose={handleClose} handleUpdate={handleUpdate} />
        </div>
    )
}

//Users list

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        try {
            axios.get("http://localhost:5000/api/users/get-all-users")
                .then(response => {
                    if (response) {
                        const data = response.data;
                        setUsers(data)
                    }

                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader />)}
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>IsAdmin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//Add Rooms

export function Addroom() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [rentPerDay, setRentPerDay] = useState();
    const [maxCount, setMaxtCount] = useState();
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [type, setType] = useState();
    const [imageurl1, setImageUrl1] = useState();
    const [imageurl2, setImageUrl2] = useState();
    const [imageurl3, setImageUrl3] = useState();

    async function addRoom() {
        const newroom = {
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }

        try {
            setLoading(true);
            const result = await axios.post("http://localhost:5000/api/rooms/add-room", newroom).data
            console.log(result);
            setLoading(false);
            Swal.fire('Congrats', 'Your New Room Added Successfully', 'success').then(result => {
                window.location.href = "/home"
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('OOps', 'Something went wrong', 'error')
        }
    }

    return (
        <div className='row'>
            {loading && (<Loader />)}
            <div className='col-md-5'>
                <input type="text" className='form-control mt-3' placeholder='room name'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='rent per day'
                    value={rentPerDay} onChange={(e) => { setRentPerDay(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='max count'
                    value={maxCount} onChange={(e) => { setMaxtCount(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='description'
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='phonenumber'
                    value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
            </div>
            <div className='col-md-5'>
                <input type="text" className='form-control mt-3' placeholder='type'
                    value={type} onChange={(e) => { setType(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='Image URL 1'
                    value={imageurl1} onChange={(e) => { setImageUrl1(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='Image URL 2'
                    value={imageurl2} onChange={(e) => { setImageUrl2(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='Image URL 3'
                    value={imageurl3} onChange={(e) => { setImageUrl3(e.target.value) }}
                />
                <div className='text-right'>
                    <button className='btn mt-2' onClick={addRoom}>Add Room</button>
                </div>
            </div>
        </div>
    )
}