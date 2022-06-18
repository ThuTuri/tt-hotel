import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function UpdateModal({ room, isShow, handleClose, handleUpdate }) {
    const [name, setName] = useState('');
    const [rentPerDay, setRentPerDay] = useState();
    const [maxCount, setMaxtCount] = useState();
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [type, setType] = useState();
    const [imageurl1, setImageUrl1] = useState();
    const [imageurl2, setImageUrl2] = useState();
    const [imageurl3, setImageUrl3] = useState();

    const setDefaultData = () => {
        setName(room.name);
        setRentPerDay(room.rentPerDay)
        setMaxtCount(room.maxCount)
        setDescription(room.description)
        setPhoneNumber(room.phoneNumber)
        setType(room.type)
        setImageUrl1(room.imageurls && room.imageurls[0])
        setImageUrl2(room.imageurls && room.imageurls[1])
        setImageUrl3(room.imageurls && room.imageurls[2])
    }

    useEffect(() => {
        if(room._id){
            setDefaultData()
        }
       
    }, [room])

    const handleSubmit = () => {
        handleUpdate({
            id: room._id,
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        })
    }

    return (
        <div>
            <Modal show={isShow} size='lg'>
                <Modal.Header>
                    <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>

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

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateModal