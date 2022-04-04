
import React, {useState,useEffect} from 'react'
import NavigationBar from './NavigationBar';
import APIService from '../APIService';
import {useCookies} from 'react-cookie'
import "./Register.css"
import{ useNavigate} from 'react-router-dom'
import { Button,Form} from 'react-bootstrap';


function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setName] = useState("");
    const [contactNumber, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [id,setID,removeID] = useCookies(['id'])
    let history = useNavigate()

    useEffect (() => {

      if(Object.keys(id).length !=  0)
      {

        
        alert("Success!")
        history("/")
  
      } 

    })



    const handleSubmit = (e) =>{

      if (confirmPassword != password)
      {

        alert("Password not matched!")
        e.preventDefault();


      }

      else
      {

      let form_data = new FormData();
      let url = 'http://127.0.0.1:8000/api/user/';
   

      form_data.append("user_username", username)
      form_data.append("user_password", password)
      form_data.append("user_name", fullName)
      form_data.append("user_number", contactNumber)
      form_data.append("user_email", email)
      form_data.append("user_abn", "0")
      
      

      APIService.post(url,form_data)
      .then(res => 
                   setID('id',res.data.user_id)
                   
      )
      .catch(err => 
                   alert("Username/Email already Exist!")
                   
      )
    
      }

      

    }
  
    return (
      <div>
          <NavigationBar></NavigationBar>
          <br></br>
  
          <div className='form'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter User" value={username} onChange = {e => setUsername(e.target.value)}/>
            
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange = {e => setPassword(e.target.value)}/>
            </Form.Group>
         
  
            <Form.Group className="mb-3" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange = {e => setConfirmPassword(e.target.value)} />
            </Form.Group>
   
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={fullName} onChange = {e => setName(e.target.value)}/>
        
            </Form.Group>
  
            <Form.Group className="mb-3" >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Number" value={contactNumber} onChange = {e => setNumber(e.target.value)}/>
          
            </Form.Group>
            
  
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  value={email} onChange = {e => setEmail(e.target.value)}/>
          
            </Form.Group>
  
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
          </div>
  
  
  
      </div>
    )
  }

export default Register