import React, { useState, useEffect } from 'react';
import Room from '../components/Room';

function HomeScreen() {

  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  useEffect(() => {

    try {
      setloading(true)
      fetch('http://localhost:5000/api/rooms/getallrooms').then(data => data.json())
        .then(json => {

          setrooms(json)
          setloading(false)
        })

    } catch (error) {
      seterror(true)
      console.log(error)
    }
  }, [])


  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (rooms.map(room => {
          return <div className='col-md-9 mt-2'>
            <Room room={room} />
          </div> ;
        }))}
      </div>
    </div>
  )
}

export default HomeScreen;