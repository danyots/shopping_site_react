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
import PrivateDetails from './PrivateDitails';
import PaymentDetails from './PaymentDetails';
import DelivaryDetails from './DelivaryDetails';
import {useSelector} from 'react-redux'

// ... (Previous imports remain the same)

export default function Customers() {
  const [val, setVal] = React.useState('');
  const [visibleClicked, setVisibleClicked] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);

  const [privateName, setPrivateName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryMonth, setExpiryMonth] = React.useState('Expiry Month');
  const [expiryYear, setExpiryYear] = React.useState('Expiry Year');
  const [cvv, setCVV] = React.useState('');

  const [city, setCity] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [houseNumber, setHouseNumber] = React.useState('');
  const [entery, setEntery] = React.useState('');
  const [floorNumber, setFloorNumber] = React.useState('');
  const [apartmentNumber, setApartmentNumber] = React.useState('');
  const [userIndex,setUserIndex]=React.useState(0)
  const data = useSelector(store=>store)


  
  const getUser = () => {
    if (data.users && data.users.length > 0) {
      setUserIndex(data.users.indexOf(data.users.find(use => use.displayed ==true)))
      
    }
  };

  React.useEffect(() => {
    getUser();
  }, [data.users]); // Add data.users to the dependency array

  const changePrivateDetails = () => {
    // Your logic to save private details
  };

  const changePaymentDetails = () => {
    // Your logic to save payment details
  };

  const changeDeliveryDetails = () => {
    // Your logic to save delivery details
  };
  return (
    <div className='customers'>
      <OptionBar userIndex={userIndex}/>
      <h1 style={{ color: 'white' }}>{data.users[userIndex].userName}</h1>
      <div>
        <PrivateDetails userIndex={userIndex}/>
        <br />
        <PaymentDetails userIndex={userIndex}/>
        <br />
        <DelivaryDetails userIndex={userIndex}/>
      </div>
      <div style={{ height: 260 }}></div>
      <footer
        style={{
          backgroundColor: '#004d40',
          width: '1520px',
          color:"white",
          marginLeft:-32,
          position: 'fixed',
          bottom: 0,
          textAlign: 'left',
          paddingBottom: 20,
        }}
      >
        <CopyrightIcon />
        <span style={{ fontWeight: 'bold' }}>Copyrights</span> All Rights Reserved
      </footer>
    </div>
  );
}

