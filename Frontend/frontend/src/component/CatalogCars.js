import React, { useEffect, useState } from 'react'
import{ useNavigate, useParams} from 'react-router-dom'
import NavigationBar from './NavigationBar';
import { 
          Container,
          Row,
          Col
        } from 'react-bootstrap';

import "./ViewCars.css"
import APIService from '../APIService';


function CatalogCars() {

 const {searchBar } = useParams()
 const [cars, setCars] = useState([])
 const search = searchBar.split("+");
 let history = useNavigate()

 useEffect(() => {


  let form_data = new FormData();
  let url = 'http://127.0.0.1:8000/search/';


  form_data.append("category", search[0])
  form_data.append("search", search[1])

  APIService.post(url,form_data)
  .then(resp => setCars(resp.data))
  .catch(err => console.log())


 },[])

 const redirect = (id) =>{

  history(`/car/${id}`)
    
  
}


  return (
    <div>

        <NavigationBar></NavigationBar>
        <br></br>
        <Container className='Grid-Box' >
          
          <Row>
          {cars.map(car => {
        return(
            <Col className = "Column" xs={3} key = {car.car_id} onClick={e => redirect(car.car_id)}>
        
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
          
            </Col>
            )
        })}
            
          </Row>

        </Container>


    </div>
  )
}

export default CatalogCars