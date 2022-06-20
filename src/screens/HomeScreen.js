import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Room from '../components/Room';
import Footer from '../components/Footer'
const { RangePicker } = DatePicker;
function HomeScreen() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicaterooms, setDuplicateRooms] = useState([]);

  const [searchkey, setSearchKey] = useState('');
  const [type, setType] = useState('all')

  useEffect(() => {

    try {
      setLoading(true)
      fetch('http://localhost:5000/api/rooms/get-all-rooms').then(data => data.json())
        .then(json => {

          setRooms(json)
          setDuplicateRooms(json)

          setLoading(false)
        })

    } catch (error) {
      setError(true)
      console.log(error)
    }
  }, []);


  function filterByDate(dates) {
    const fromDateTemp = moment(dates[0]).format('DD-MM-YYYY')
    const toDateTemp = moment(dates[1]).format('DD-MM-YYYY')
    setFromDate(fromDateTemp)
    setToDate(toDateTemp)

    var temprooms = []
    var availability = false

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          const bookingFromDate = moment(booking.fromDate).format('DD-MM-YYYY')
          const bookingToDate = moment(booking.toDate).format('DD-MM-YYYY')
          if (!moment(fromDateTemp, 'DD-MM-YYYY').isBetween(bookingFromDate, bookingToDate)
            && !moment(toDateTemp, 'DD-MM-YYYY').isBetween(bookingFromDate, bookingToDate)
          ) {
            if (
              fromDateTemp !== booking.fromDate &&
              fromDateTemp !== booking.toDate &&
              toDateTemp !== booking.fromDate &&
              toDateTemp !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }
      setRooms(temprooms)
    }
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temprooms)
  }

  function filterByType(e) {
    setType(e)
    if (e != 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setRooms(temprooms)
    } else {
      setRooms(duplicaterooms)
    }
  }


  return (
    <div>
      <div className='container'>
        <div className='row mt-5 bs' >
          <div className='col-md-3'>
            <RangePicker format='DD-MM-YY' onChange={filterByDate} />
          </div>
          <div className='col-md-5'>
            <input type='text' className='form-control' placeholder='search rooms'
              value={searchkey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch}
            />
          </div>
          <div className='col-md-3'>
            <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

        </div>
        <div className='row justify-content-center mt-5  '>
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room, index) => {
              return (
                <div className='col-md-9 mt-3' key={room._id + index}>
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                </div>

              );
            })
          )}
        </div>
      </div>

      <Footer />
    </div>

  );
}

export default HomeScreen;