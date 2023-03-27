import React, { useState } from 'react'
import './addstudent.css'
import { db } from '../firebase-config'
import {
    collection, addDoc,
} from 'firebase/firestore'

export default function AddStudent() {

    const userCollectionRef = collection(db, "Students");

    const [fname, setFname] = useState()
    const [mname, setMname] = useState()
    const [lname, setLname] = useState()
    const [studentclass, SetClass] = useState()
    const [division, SetDivision] = useState()
    const [rollNo, SetRollNo] = useState()
    const [addr1, SetAddress1] = useState()
    const [addr2, SetAddress2] = useState()
    const [landmark, SetLandmark] = useState()
    const [city, SetCity] = useState()
    const [pincode, SetPincode] = useState()
    const [alert, setAlert] = useState(null)

    const addStudent = async (event) => {
        event.preventDefault();
        await addDoc(userCollectionRef, { firstName: fname, middleName: mname, lastName: lname, class: Number(studentclass), division: division, roll: Number(rollNo), address1: addr1, address2: addr2, landmark: landmark, city: city, pincode: Number(pincode) });
        setAlert('New Student Added!!')
        document.getElementById('add-student-form').reset();
    }

    return (
        <div className='add-student-container container'>
            <div className="title row">
                <h5 className='col-9'>Add student </h5>
                <span className='col-3'>{new Date().toLocaleString()}</span>
                {alert && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Registration Successful  :  </strong>  {alert}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>)}
            </div>
            <form className="row g-3 needs-validation mt-3" id='add-student-form' onSubmit={addStudent}>
                <div className="col-md-4">
                    {/* <label for="validationCustom01" className="form-label">First name</label> */}
                    <input type="text" className="form-control" id="fname" name='fname' placeholder='First Name' onChange={(event) => { setFname(event.target.value) }} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <label for="validationCustom01" className="form-label">First name</label> */}
                    <input type="text" className="form-control" id="mname" name='mname' placeholder='Middle Name' onChange={(event) => { setMname(event.target.value) }} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <label for="validationCustom01" className="form-label">First name</label> */}
                    <input type="text" className="form-control" id="lname" name='lname' placeholder='Last Name' onChange={(event) => { setLname(event.target.value) }} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <label for="validationCustom04" className="form-label">State</label> */}
                    <select className="form-select" id="selectClass" onChange={(event) => { SetClass(event.target.value) }} required>
                        {/* <option selected disabled value={0}>Select Class</option> */}
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
                    {/* <label for="validationCustom04" className="form-label">State</label> */}
                    <select className="form-select" id="selectDivision" onChange={(event) => { SetDivision(event.target.value) }} required>
                        {/* <option selected disabled value={0}>Select Division</option> */}
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
                    {/* <label for="validationCustom01" className="form-label">First name</label> */}
                    <input type="number" className="form-control" id="rollNo" name='rollNo' placeholder='Enter Roll Number in Digits' onChange={(event) => { SetRollNo(event.target.value) }} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    {/* <label for="validationCustom03" className="form-label">City</label> */}
                    <textarea className="form-control" id="addr1" name='addr1' placeholder='Address Line 1' onChange={(event) => { SetAddress1(event.target.value) }} required />
                    <div className="invalid-feedback">
                        Please provide a valid address.
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    {/* <label for="validationCustom03" className="form-label">City</label> */}
                    <textarea className="form-control" id="addr2" name='addr2' placeholder='Address Line 2' onChange={(event) => { SetAddress2(event.target.value) }} required />
                    <div className="invalid-feedback">
                        Please provide a valid address.
                    </div>
                </div>

                <div className="col-md-4">
                    {/* <label for="validationCustom05" className="form-label">Zip</label> */}
                    <input type="text" className="form-control" id="landmark" name='landmark' placeholder='Landmark' onChange={(event) => { SetLandmark(event.target.value) }} required />
                    <div className="invalid-feedback">
                        Please provide a valid landmark.
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <label for="validationCustom05" className="form-label">Zip</label> */}
                    <input type="text" className="form-control" id="city" name='city' placeholder='City' onChange={(event) => { SetCity(event.target.value) }} required />
                    <div className="invalid-feedback">
                        Please provide a valid city.
                    </div>
                </div>
                <div className="col-md-4">
                    {/* <label for="validationCustom05" className="form-label">Zip</label> */}
                    <input type="number" className="form-control" id="pincode" name='pincode' placeholder='Pincode' min={100000} max={999999} onChange={(event) => { SetPincode(event.target.value) }} required />
                    <div className="invalid-feedback">
                        Please provide a valid pincode.
                    </div>
                </div>

                <div className="col-12">
                    <input className="btn btn-primary" type="submit" value="Add Student" />
                </div>
            </form >
        </div >
    )
}
