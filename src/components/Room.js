import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  duration: 1000
});

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs mb-3' data-aos='fade-up'>
      <div className='col-md-4'>
        <img src={room.imageurls[0]} className='smallimg' />
      </div>
      <div className='col-md-7 '>
        <h1>{room.name}</h1>
        <div style={{display: 'flex'}}>
          <i className='fa fa-wifi mr-2 mt-1' style={{color: 'green'}}></i>
          <p className='mr-3'>Free Wifi</p>
          <i className='fa fa-check mr-2 mt-1' style={{color: 'green'}}></i>
          <p className='mr-3'>Breakfast</p>
          <i className='fa fa-car mr-2 mt-1' style={{color: 'green'}}></i>
          <p className='mr-3'>Airport transfers</p>
        </div>
        <b>
          {" "}
          <p>Max Count: {room.maxCount}</p>
          <p>Rent Per Day:{" "}${room.rentPerDay}</p>
          <p>Type: {room.type}</p>
        </b>


        <div style={{ float: 'right' }}>


          {(fromDate && toDate) && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className='btn m-2'>Book Now</button>
            </Link>
          )}

          <button className='btn ' onClick={handleShow}>View Details</button>
        </div>
      </div>



      <Modal size='lg' show={show} onHide={handleClose} >
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel >
            {room.imageurls.map((url, index) => {
              return <Carousel.Item key={url + index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt="Third slide"
                />
              </Carousel.Item>
            })}
          </Carousel>
          <p style={{ marginTop: 16 }}>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Room