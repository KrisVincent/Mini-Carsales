import React, {useState,useEffect} from 'react'
import NavigationBar from './component/NavigationBar'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import APIService from './APIService';


function App() {

  const [spacing, setSpacing] = useState(2);
  const [card_data , setCards] = useState([])
                      
  useEffect (() => {

    let url = "http://127.0.0.1:8000/api/car/"
    APIService.get(url)
    .then(resp => setCards(resp.data))
    .catch(err => console.log(err))

  },[])



  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <br></br>
      
    <Grid sx={{ flexGrow: 1 } } container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing= {10}>
          
          {card_data.map((value) => (
            <Grid key={value.car_id} item>          
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  image = {`http://127.0.0.1:8000${value.car_image}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {value.car_model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {value.car_comments}
                  </Typography>
                </CardContent>
              </Card>      
            </Grid>
          ))}
        </Grid>
      </Grid>
      
    </Grid>

    
      
    </div>
  );
}

export default App;
