import React, {useState,useEffect} from 'react'
import NavigationBar from './NavigationBar';
import {useCookies} from 'react-cookie'
import{ useNavigate} from 'react-router-dom'
import "./Register.css"
import { Button,Form} from 'react-bootstrap';
import APIService from '../APIService';


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [id,setID,removeID] = useCookies(['id'])
  let history = useNavigate()

  const handleSubmit = (e) =>
  {

      console.log(username,password)

      let form_data = new FormData();
      let url = 'http://127.0.0.1:8000/login/';

      form_data.append("user_username",username)
      form_data.append("user_password",password)

      APIService.post(url,form_data)
      .then(res => 
        setID('id',res.data)
        
      )
      .catch(err => 
              alert("Wrong Credentials!")
              
      )
      
      e.preventDefault();

  }

  useEffect(() => 
  {
    if(Object.keys(id).length !=  0){

      history("/")

    } 

  },[id])

  return (
    <div>
        <NavigationBar/>
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
         
  
        
  
            <Button variant="primary" type="submit" >
              Login
            </Button>
          </Form>
          </div>
  

    </div>
  )
}

export default Login