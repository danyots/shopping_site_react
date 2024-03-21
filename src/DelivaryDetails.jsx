import * as React from 'react';
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

// ... (Previous imports remain the same)

export default function DelivaryDetails(props) {

    const [isPrivate, setIsPrivate] = React.useState(false);
  
  
    const [city, setCity] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [houseNumber, setHouseNumber] = React.useState('');
    const [entery, setEntery] = React.useState('');
    const [floorNumber, setFloorNumber] = React.useState('');
    const [apartmentNumber, setApartmentNumber] = React.useState('');
    const data=useSelector(store=>store)
    const dispatch=useDispatch()

    React.useEffect(()=>{
        setDefualt()
      },[props.userIndex])
      const setDefualt=()=>{
        setCity(data.users[props.userIndex].details.delivary.city)
        setStreet(data.users[props.userIndex].details.delivary.street)
        setHouseNumber(data.users[props.userIndex].details.delivary.houseNumber)
        setIsPrivate(data.users[props.userIndex].details.delivary.isPrivate)
        setEntery(data.users[props.userIndex].details.delivary.entry)
        setFloorNumber(data.users[props.userIndex].details.delivary.floor)
        setApartmentNumber(data.users[props.userIndex].details.delivary.apartment)
      }
  

    const changeDeliveryDetails = (e) => {
        e.preventDefault()
      const action={type:"UPDATEDELIVARY",
    dat:{city:city,
    street:street,
    houseNumber:houseNumber,
    isPrivate:isPrivate,
    entry:entery,
    floor:floorNumber,
    apartment:apartmentNumber},userIndex:props.userIndex}
    dispatch(action)
    };
  return (
    <div >
    <Accordion sx={{ width: 1000 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography sx={{ fontWeight: 'bold' }}>Delivery Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={changeDeliveryDetails}
          >
            <hr />
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
            <button style={{ float: "right", backgroundColor: "teal", marginBottom: 10, marginTop: 20, border: "3px solid darkgray" }} type="submit">save</button>
          </Box>
        </Typography>
      </AccordionDetails>
    </Accordion>        </div>

        )
        }
