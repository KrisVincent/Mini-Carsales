import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';


import "./App.css"
import "./component/NavigationBar.css"
import reportWebVitals from './reportWebVitals';
import Login from './component/Login';
import Register from './component/Register';
import CatalogCars from './component/CatalogCars';
import ViewCar from './component/ViewCar';
import App from './App';
import AddCars from './component/AddCars';
import YourCars from './component/YourCars';

function Router(){

  return (

  <CookiesProvider>

  <BrowserRouter>
    <Routes>
     
      <Route path = "/" element = {<App/>}/>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/car/:id" element = {<ViewCar/>}/>
      <Route path = "/addCars" element = {<AddCars/>}/>
      <Route path = "/yourCars" element = {<YourCars/>}/>
      <Route path = "/viewCars" element = {<CatalogCars/>}>
        <Route path=":searchBar" element={<CatalogCars/>} />
      </Route>
      
    </Routes>
  </BrowserRouter>

  </CookiesProvider> 

  )
}





ReactDOM.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
