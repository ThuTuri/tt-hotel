import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Room from '../components/Room';
const { RangePicker } = DatePicker;
function HomeScreen() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {

    try {
      setLoading(true)
      fetch('http://localhost:5000/api/rooms/get-all-rooms').then(data => data.json())
        .then(json => {

          setRooms(json)
          setLoading(false)
        })

    } catch (error) {
      setError(true)
      console.log(error)
    }
  }, []);


  function filterByDate(dates){
    setFromDate(moment(dates[0]).format('DD-MM-YYYY'))
    setToDate(moment(dates[1]).format('DD-MM-YYYY'))
  }


  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
        <RangePicker format='DD-MM-YY' onChange={filterByDate} />
        </div>
      </div>
      <div className='row justify-content-center mt-5  '>
        {loading ? (
        <Loader/>
        ) : rooms.length>1 ? (
          rooms.map(room => {
            return <div className='col-md-9 mt-3'>
            <Room room={room} fromDate={fromDate} toDate={toDate} />
          </div> ;
        }) 
        ) : (
        <Error/>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;