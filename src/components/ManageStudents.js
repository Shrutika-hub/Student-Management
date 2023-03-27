// import { getDatabase, ref, set, push, child, update } from "firebase/database";
import React from 'react'
import {
    collection,
    getDocs, doc, deleteDoc, updateDoc
} from 'firebase/firestore'
import { db } from '../firebase-config';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { toast, ToastContainer } from 'react-toastify'

export default function ManageStudents() {

    const [alert, setAlert] = useState(null)

    const [owner, setOwner] = useState(null);
    const [show, setShow] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "Students");
    const getUsers = async () => {
        const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();

    const handleClose = () => setShow(false);
    function handleShow(user) {
        setOwner(user)
        setShow(true);
        console.log(owner['firstName']);
    }

    const handleUpdateClose = () => setShowUpdateModal(false);
    function handleUpdateShow(user) {
        setOwner(user);
        setShowUpdateModal(true);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        // toast.success('Updating...')

        const docRef = doc(db, 'Students', owner['id'])
        updateDoc(docRef, owner)

        setShowUpdateModal(false);
        window.alert('User Updated Successfully...');
    }

    const handleDelete = async (user) => {
        if (window.confirm("Are you sure you wanna delete this item?")) {
            const userDoc = doc(db, "Students", user.id);
            deleteDoc(userDoc);
            getUsers()
        }
    }

    return (
        <>
            {/* <ToastContainer /> */}
            <div className='manage-student'>
                <div className="title row">
                    <h5 className='col-9'>Manage Students</h5>
                    <span className='col-3'>{new Date().toLocaleString()}</span>

                </div>
                <div className='mt-3'>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Class</th>
                                <th scope='col'>Roll No.</th>
                                <th scope='col'>View / Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.firstName}  {user.middleName}  {user.lastName}</td>
                                        <td>{user.class}-{user.division}</td>
                                        <td>{user.roll}</td>
                                        <td><i className="fa-regular fa fa-eye text-danger mx-3" onClick={() => handleShow(user)}></i><i className="fa-regular fa fa-edit  text-danger mx-3" onClick={() => handleUpdateShow(user)}></i><i className="fa-regular fa fa-trash  text-danger mx-3" onClick={() => handleDelete(user)}></i></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Student Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <p>{owner}</p> */}
                        {owner &&
                            <table className='table'>
                                <tr>
                                    <td>Full Name</td>
                                    <td>{owner['firstName']} {owner['middleName']} {owner['lastName']}</td>
                                </tr>
                                <tr>
                                    <td>Roll No.</td>
                                    <td>{owner['roll']}</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>{owner['class']} - {owner['division']}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{owner['address1']}, {owner['address2']}</td>
                                </tr>
                                <tr>
                                    <td>Landmark</td>
                                    <td>{owner['landmark']}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{owner['city']}</td>
                                </tr>
                                <tr>
                                    <td>Pincode</td>
                                    <td>{owner['pincode']}</td>
                                </tr>
                            </table>}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Student Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {owner &&
                            <form className="row g-3 needs-validation mt-3" id='add-student-form' onSubmit={handleUpdate}>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" id="fname" name='fname' placeholder='First Name' value={owner['firstName']} onChange={(event) => {
                                        owner['firstName'] = event.target.value
                                    }} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" id="mname" name='mname' placeholder='Middle Name' value={owner['middleName']} onChange={(event) => {
                                        owner['middleName'] = event.target.value
                                    }} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" id="lname" name='lname' value={owner['lastName']} placeholder='Last Name' onChange={(event) => {
                                        owner['lastName'] = event.target.value
                                    }} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" id="selectClass" value={owner['class']} onChange={(event) => {
                                        owner['class'] = event.target.value
                                    }} required>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid class.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" id="selectDivision" value={owner['division']} onChange={(event) => {
                                        owner['division'] = event.target.value
                                    }} required>
                                        <option value={'A'}>A</option>
                                        <option value={'B'}>B</option>
                                        <option value={'C'}>C</option>
                                        <option value={'D'}>D</option>
                                        <option value={'E'}>E</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="number" className="form-control" id="rollNo" name='rollNo' value={owner['roll']} placeholder='Enter Roll Number in Digits' onChange={(event) => {
                                        owner['roll'] = event.target.value
                                    }} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 mt-5">
                                    <textarea className="form-control" id="addr1" name='addr1' placeholder='Address Line 1' value={owner['address1']} onChange={(event) => {
                                        owner['address1'] = event.target.value
                                    }} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid address.
                                    </div>
                                </div>
                                <div className="col-md-6 mt-5">
                                    <textarea className="form-control" id="addr2" name='addr2' placeholder='Address Line 2' value={owner['address2']} onChange={(event) => {
                                        owner['address2'] = event.target.value
                                    }} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid address.
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <input type="text" className="form-control" id="landmark" name='landmark' value={owner['landmark']} placeholder='Landmark' onChange={(event) => {
                                        owner['landmark'] = event.target.value
                                    }} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid landmark.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" id="city" name='city' value={owner['city']} placeholder='City' onChange={(event) => {
                                        owner['city'] = event.target.value
                                    }} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="number" className="form-control" id="pincode" name='pincode' value={owner['pincode']} placeholder='Pincode' min={100000} max={999999} onChange={(event) => {
                                        owner['pincode'] = event.target.value
                                    }} required />
                                    <div className="invalid-feedback">
                                        Please provide a valid pincode.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <input className="btn btn-primary" type="submit" value="Update Details" />
                                </div>
                            </form >
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                            close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        </>
    )
}
