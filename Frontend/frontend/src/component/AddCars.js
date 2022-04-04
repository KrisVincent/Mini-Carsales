import React, {useState,useEffect} from 'react'
import NavigationBar from './NavigationBar';
import APIService from '../APIService';
import{ useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import "./Register.css"

import { Button,
         Form,
         Row,
         Col} from 'react-bootstrap';


function AddCars() {

    const [id,setID,removeID] = useCookies(['id']);
    const [carYear, setCarYear] = useState(0);
    const [carModel, setCarModel] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carComments, setCarComments] = useState("");
    const [priceType, setPriceType] = useState("EGC");
    const [price, setPrice] = useState(0)
    const [isDealer, setIsDealer] = useState(false)
    const [name,setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [carImage,setCarImage] = useState(null)

    let history = useNavigate()

    useEffect(() => 
    {
      if(Object.keys(id).length ==  0)
      {

        
        alert("Login first!")
        history("/login")
  
      } 

      else
      {

        APIService.get(`http://127.0.0.1:8000/api/user/${id["id"]}`)
        .then(function (response) {
          setEmail(response.data[0].user_email),
          setName(response.data[0].user_name),
          setNumber(response.data[0].user_number)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    },[id])

    const handleSubmit = (e) =>{


      let form_data = new FormData();
      let url = 'http://127.0.0.1:8000/api/car/';
       
      form_data.append("car_year",carYear);
      form_data.append("car_make", carMake);
      form_data.append("car_model", carModel,);
      form_data.append("car_comments", carComments);
      form_data.append("car_image", carImage);
      form_data.append("price_type", priceType);
      form_data.append("price_dap",price+1000);
      form_data.append("price_egc", price+2000);
      form_data.append("price_advertised",price);
      form_data.append("contact_name", name);
      form_data.append("contact_number", number);
      form_data.append("contact_email", email);
      form_data.append("dealer_abn",0);
      form_data.append("user_id", id["id"]);

      APIService.post(url,form_data)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
      
  

    }

    const handleCheckBox = () =>{

      setIsDealer(isDealer === false ? true : false)


    }



    return (
        <div>
            <NavigationBar></NavigationBar>
            <br></br>
          <div className='form'>
            <Form onSubmit={handleSubmit}>

              <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Car Year</Form.Label>
                    <Form.Control type = "number" value={carYear} onChange = {e => setCarYear(e.target.value)} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Car Make</Form.Label>
                    <Form.Control type = "text" value={carMake} onChange = {e => setCarMake(e.target.value)}  />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Car Model</Form.Label>
                    <Form.Control type = "text" value={carModel} onChange = {e => setCarModel(e.target.value)} />
                  </Form.Group>
                </Row>


                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Car Comments</Form.Label>
                  <Form.Control as="textarea" rows={3} value={carComments} onChange = {e => setCarComments(e.target.value)} />
                </Form.Group>

                <Row className="mb-3">

                  <Form.Group as={Col}  controlId="formGridAddress2">
                    <Form.Label>Price Type</Form.Label>
                    <Form.Select  value={priceType} onChange = {e => setPriceType(e.target.value)} >
                      <option>EGC</option>
                      <option>DAP</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}  controlId="formGridAddress2">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type = "number" value={price} onChange = {e => setPrice(e.target.value)} />
                  </Form.Group>

                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Dealer Car?" onClick={handleCheckBox}  />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} readOnly/>
          
              </Form.Group>
    
              <Form.Group className="mb-3" >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Number" value={number} readOnly/>
            
              </Form.Group>
              
    
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  value={email} readOnly/>
            
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Car Image</Form.Label>
                <Form.Control type="file" accept="image/png, image/jpeg"  onChange={(e)=>{setCarImage(e.target.files[0])}}  />
            
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
            </Form>
    
          </div>
    
        </div>
    )
}

export default AddCars