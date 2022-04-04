import React, {useState,useEffect} from 'react'
import { Nav } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import{ useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import APIService from '../APIService';

import { 
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
  
  } from 'react-bootstrap';

  import "./YourCars.css"

function YourCars() {
  
  const [id,setID,removeID] = useCookies(['id']);
  const [cars,setCars]  = useState([]) 
  const [show, setShow] = useState(false);
  const [carid, setCarid] = useState(0)
  const [carYear, setCarYear] = useState(0);
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carComments, setCarComments] = useState("");
  const [priceType, setPriceType] = useState("EGC");
  const [price, setPrice] = useState(0)
  const [isDealer, setIsDealer] = useState(false)
 
  const [carImage,setCarImage] = useState(null)

  const handleClose = () => setShow(false);

  const handleCheckBox = () =>{

    setIsDealer(isDealer === false ? true : false)


  }

  const handleUpdate = () =>{

  
    
    let form_data = new FormData();
    let url = `http://127.0.0.1:8000/api/car/${id["id"]}/`;


    form_data.append("car_year", carYear)
    form_data.append("car_make", carMake)
    form_data.append("car_model", carModel)
    form_data.append("car_comments", carComments)
    form_data.append("car_isFlagged", isDealer)
    form_data.append("price_type", priceType)
    form_data.append("price_dap",price+1000)
    form_data.append("price_egc", price+2000)
    form_data.append("price_advertised", price)
    form_data.append("car_image",carImage)
    

    APIService.patch(url,form_data)
    .then(resp => alert("success!"))
    .catch(err => console.log(err))

    window.location.reload();

  }

  const handleDelete = (car) =>{
    
    let url = `http://127.0.0.1:8000/api/car/${car.car_id}/`;
    APIService.delete(url)
    .catch(alert("successfully deleted!"))
    .then(err => console.log(err))

    window.location.reload();
  }



  const handleShow = (car) => {
    
    setShow(true);
    setCarid(car.car_id)
    setCarYear(car.car_year)
    setCarModel(car.car_model)
    setCarMake(car.car_make)
    setCarComments(car.car_comments)
    setPrice(car.price_advertised)
    setPriceType(car.price_type)
    setIsDealer(car.car_isFlagged)
    setCarImage(car.car_image)


  }


  let history = useNavigate()

  useEffect(() => 
    {
      if(Object.keys(id).length ==  0)
      {

        
        alert("Login first!")
        history("/login")
  
      } 

      let url = `http://127.0.0.1:8000/api/car/${id["id"]}`;

 
      APIService.get(url)
      .then(resp => setCars(resp.data))
      .catch(err => console.log(err))
      
    },[id])

  return (
    <div>

        
        <NavigationBar/>

        <br></br>
        <Container className='Grid-Box' >
          
          <Row>
          {cars.map(car => {
        return(
            <Col className = "Your-Column" xs={3} key = {car.car_id} >
        
              <img src= {`http://127.0.0.1:8000${car.car_image}`} height="150" width="150"/>
              
              <h2>Model: {car.car_model}</h2>
              <h2>Make: {car.car_make}</h2>
              <h2>Year: {car.car_year}</h2>
              <p>Comments : {car.car_comments}</p>
              {car.price_type == "DAP" ?
              <p>Price(DAP): ₱ {car.price_dap} </p>
              :
              <p>Price(EGC): ₱ {car.price_egc} </p>
               }
               {car.car_isFlagged ? 
              <p>isFlagged: yes</p>
              :
              <p>isFlagged: no</p> 
              }

              <Button variant="primary" onClick={() => handleShow(car)} >Edit Car!</Button>
              <Button variant="danger" onClick={() => handleDelete(car)}>Delete Car!</Button>
              <br/>
          
            </Col>
            )
        })}
            
          </Row>

        </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>!
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

              <Form.Group className="mb-3">
                <Form.Label>Car Image</Form.Label>
                <Form.Control type="file" accept="image/png, image/jpeg"  onChange={(e)=>{setCarImage(e.target.files[0])}}  />
            
              </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default YourCars