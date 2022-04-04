import React, {useState,useEffect} from 'react'
import {useCookies} from 'react-cookie'
import Cookies from 'universal-cookie';
import {BrowserRouter, useNavigate} from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function NavigationBar() {
  const [carAnchor, setCarAnchor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const isCarMenuOpen =  Boolean(carAnchor);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [id,setID,removeID] = useCookies(['id'])
  const [category, setCategory] = useState("Year")
  let history = useNavigate()

  const handleChange = (event) => {
 
    setCategory(event.target.value);
  }
  
  const searchBtn = () =>{



    history(`/viewCars/${category +"+"+search}`)
    window.location.reload();
  
  
 
  }

  const logoutBtn = () =>{

    const cookies = new Cookies();
    removeID(['id'])

    cookies.remove('id', { path: '/' });
    
   
  
    window.location.reload();

  
  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCarMenuOpen = (event) => {
    setCarAnchor(event.currentTarget);
  };

  const handleCarMenuClose = () =>{
    setCarAnchor(false);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const CarMenuId = 'primary-search-car-menu';
  const renderCarMenu = (
    <Menu  className='links'
      anchorEl={carAnchor}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={CarMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isCarMenuOpen}
      onClose={handleCarMenuClose}
    >
 

      <div>
      <a href="/addCars"><MenuItem >Add Cars</MenuItem></a>
      <a href="/yourCars"><MenuItem >My Cars</MenuItem></a>
      </div>
     
   
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu  className='links'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     { Object.keys(id).length=== 0 ? 

      <div>
      <a href="/login"><MenuItem >Login</MenuItem></a>
      <a href="/register"><MenuItem >Register</MenuItem></a>
      </div>
      :
      <div>
      <a href="https://www.w3schools.com"><MenuItem >Profile</MenuItem></a>
      <a onClick={logoutBtn}><MenuItem >LogOut</MenuItem></a>
      </div>
     }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={handleCarMenuOpen}>
        <IconButton
          size="large"
          aria-label="Cars of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <DirectionsCarIcon/>
        </IconButton>
        <p>Cars</p>
      </MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >     
          MUI  
          <br></br>
          </Typography>

          <Box sx={{ minWidth: 90 ,minHeight:50, padding:1}}>
            <FormControl fullWidth  variant="filled">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
            
                <MenuItem value={"Year"}>Year</MenuItem>
                <MenuItem value={"Model"}>Model</MenuItem>
                <MenuItem value={"Make"}>Make</MenuItem>
              </Select>
            </FormControl>
          </Box>

          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value = {search}
              onChange = {e => setSearch(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            
          </Search>

          <Button variant="contained" onClick={searchBtn}>Search!</Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleCarMenuOpen}
              color="inherit"
            >
              <DirectionsCarIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderCarMenu}
    </Box>
  );
}
export default NavigationBar;