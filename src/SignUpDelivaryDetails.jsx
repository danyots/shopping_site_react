import { useState,useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CopyrightIcon from '@mui/icons-material/Copyright';
import OptionBar from './OptionBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, MenuItem } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useSelector,useDispatch} from 'react-redux'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function SignUpDelivaryDetails() {
    const navigate=useNavigate()
    const [city, setCity] = useState(sessionStorage.getItem("city"));
    const [street, setStreet] = useState(sessionStorage.getItem("street"));
    const [houseNumber, setHouseNumber] = useState(sessionStorage.getItem("houseNumber"));
    const [entery, setEntery] = useState(sessionStorage.getItem("entery"));
    const [floorNumber, setFloorNumber] = useState(sessionStorage.getItem("floor"));
    const [apartmentNumber, setApartmentNumber] = useState(sessionStorage.getItem("apartmentNumber"));
    const [isPrivate, setIsPrivate] = useState(sessionStorage.getItem("isPrivate"));
    
    const changeDeliveryDetails = (e) => {
        e.preventDefault()
        sessionStorage.setItem("city",city)
        sessionStorage.setItem("street",street)
        sessionStorage.setItem("houseNumber",houseNumber)
        sessionStorage.setItem("entery",entery)
        sessionStorage.setItem("floor",floorNumber)
        sessionStorage.setItem("apartmentNumber",apartmentNumber)
        sessionStorage.setItem("isPrivate",isPrivate)
        navigate("/new-user")
    }
    const back=()=>{
      history.back()
  }
  return (
    <div className='login'>
      <IconButton onClick={back}>
            <ArrowBackIcon sx={{color:"white"}}/>
        </IconButton>
        <h1 style={{color:"white",marginLeft:150,marginTop:30,textAlign:"center"}}>Sign Up</h1>
        <Card sx={{marginLeft:20,marginRight:-10}}>
            <CardContent sx={{textAlign:"center",marginTop:5,marginBottom:-5,fontSize:20,fontWeight:"bold"}}>please insert your adress details</CardContent>
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },marginTop:10,marginBottom:10,marginLeft:10
            }}
            onSubmit={changeDeliveryDetails}
          >

            <h3>Delivery Address</h3>
            <TextField
            required
              id="city"
              label="City"
              placeholder="City"
              variant="standard"
              helperText="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
            required
              id="street"
              label="Street"
              placeholder="Street"
              variant="standard"
              helperText="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
            required
              id="House Number"
              label="House Number"
              placeholder="House Number"
              variant="standard"
              helperText="House Number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <br />
            <input type="checkbox" id="isPrivate" value={isPrivate} checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />My House is a Private House
            <br />
            {isPrivate ? null :
              <Box>
                <TextField
                required
                  inputProps={{ min: 0 }}
                  type='number'
                  id="entry"
                  label="Entry"
                  placeholder="Entry"
                  variant="standard"
                  helperText="Entry"
                  value={entery}
                  onChange={(e) => setEntery(e.target.value)}
                />
                <TextField
                required
                  type='number'
                  id="floor Number"
                  label="Floor"
                  placeholder="House Number"
                  variant="standard"
                  helperText="House Number"
                  value={floorNumber}
                  onChange={(e) => setFloorNumber(e.target.value)}
                />
                <TextField
                required
                  inputProps={{ min: 1 }}
                  type='number'
                  id="apartment Number"
                  label="Apartment Number"
                  placeholder="Apartment Number"
                  variant="standard"
                  helperText="Apartment Number"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                />
              </Box>
            }
            <button style={{ float: "right", backgroundColor: "teal",marginRight:35, marginBottom: 10, marginTop: 20, border: "3px solid darkgray" }} type="submit">Next</button>
              </Box>
       </Card>
    </div>
  )
}