import React, { useEffect, useState } from 'react'
import{ useNavigate, useParams} from 'react-router-dom'
import APIService from '../APIService';
import {useCookies} from 'react-cookie'
import NavigationBar from './NavigationBar';
import "./ViewCars.css"

import { Button,
  Form,
  Row,
  Col} from 'react-bootstrap';


function ViewCar() {
  
  const [userId,setID,removeID] = useCookies(['id']);
  const {id} = useParams()
  const [car, setCar] = useState({})
  const [email, setEmail] = useState()
  const [inquiryType , setType] = useState("About Car")
  const [msgContent, setMsg] = useState("")

  let history = useNavigate()

  useEffect(() => {

    if(Object.keys(userId).length ==  0)
      {

        
        alert("Login first!")
        history("/login")
  
      } 

    let url = `http://127.0.0.1:8000/api/car/${id}`;

    APIService.get(url)
    .then(resp => setCar(resp.data[0]))
    .catch(err => console.log(err))
    
    url = `http://127.0.0.1:8000/api/user/${userId.id}`;

    APIService.get(url)
    .then(resp => setEmail(resp.data[0].user_email))
    .catch(err => console.log(err))

  },[])

  const handleSubmit = (e) =>{



    console.log(inquiryType+ ` ${car.car_make} ${car.car_model} ${car.car_year}`)

    let form_data = new FormData();
    let url = `http://127.0.0.1:8000/email/`;

    form_data.append("recipient",email)
    form_data.append("subject",inquiryType+ ` (${car.car_make} ${car.car_model} ${car.car_year})`)
    form_data.append("message",msgContent)

    APIService.post(url,form_data)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))

    alert("Email Sent! Wait for his/her response")


  }

  return (
    <div>
        <NavigationBar></NavigationBar>


       <div className='Car-view'>
         <img src= {`http://127.0.0.1:8000${car.car_image}`} height="300" width="300"/>
    
          <div className='Car-view-data'>
            <p>{car.car_make} {car.car_model} {car.car_year}</p>
            {car.price_type == "EGC" ? 
            <p>Price: {car.price_egc} (EGC)</p>
            :
            <p>Price: {car.price_dap} (DAP)</p>
            }
            <p>Comments: {car.car_comments}</p>
              
            {car.car_isFlagged ?
            <div>
            <p>Dealer Car</p>
            <p>Dealer ABN: {car.dealer_abn}</p>
            </div>
            :
            <div>
            <p>Non Dealer Car</p>
            <p>Car Owner Contacts</p>
            <p>Email: {car.contact_email}</p>
            <p>Name: {car.contact_name}</p>
            <p>Number: {car.contact_number}</p>
            </div>  
            }
              
          </div>
               
        </div>

        <br/>

        <div className='form'>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Contact Owner (Your Email Will be used to send your inquiry)</Form.Label>
     
                <Form.Group >
                    <Form.Label>Inquiry Type</Form.Label>
                    <Form.Select value={inquiryType} onChange = {e => setType(e.target.value)} >
                      <option>About Car</option>
                      <option>About Price</option>
                      <option>Others Inquiries</option>
                    </Form.Select>
                </Form.Group>
        

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} value={msgContent} onChange = {e => setMsg(e.target.value)} />
                </Form.Group>

              <Button variant="primary" type="submit">
                  Submit
              </Button>
            </Form>
    
          </div>


    </div>
  )
}

export default ViewCar