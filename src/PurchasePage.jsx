import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {useSelector,useDispatch} from 'react-redux'
import EuroIcon from '@mui/icons-material/Euro';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DoneAllIcon from '@mui/icons-material/DoneAll';



const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const dispatch = useDispatch()
    const [totalPrice,setTotalPrice]=useState(0)
    const data=useSelector(store=>store)
  const [open, setOpen] = React.useState(props.open);
  const [showPurchased,setShowPurchased]=useState(false)
  const [isHoveredX, setIsHoveredX] = useState(false)
    const [isHoveredCancel, setIsHoveredCancel] = useState(false)
    const [isHoveredPurchase, setIsHoveredPurchase] = useState(false)

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [expireMonth, setExpireMonth] = useState('month');
    const [expireYear, setExpireYear] = useState('year');
    const [anyFieldIsntFilled,setAnyFieldIsntFilled]=useState(false)
    const [time,setTime]=useState('')
    const [agree,setAgree]=useState(false)
    


    const handleCardNumberChange = (e) => {
      const input = e.target.value;
      // Remove non-digit characters
      const sanitizedInput = input.replace(/\D/g, '');
      // Format the input with spaces every 4 digits
      const formattedInput = sanitizedInput.replace(/(\d{4})/g, '$1 ').trim();
      // Limit to 16 digits
      const limitedInput = formattedInput.substring(0, 19);
      
      setCardNumber(limitedInput);
    };
    const handleCVVChange = (e) => {
        const input = e.target.value;
        // Remove non-digit characters
        const sanitizedInput = input.replace(/\D/g, '');
        // Limit to 3 digits
        const limitedInput = sanitizedInput.substring(0, 3);
        
        setCVV(limitedInput);
      };
      useEffect(()=>{
        setDefualt()
      },[props.userIndex])
      const setDefualt=()=>{
        setCardNumber(data.users[props.userIndex].details.payment.cardNumber)
        setCVV(data.users[props.userIndex].details.payment.cvv)
        setExpireMonth(data.users[props.userIndex].details.payment.expiryMonth)
        setExpireYear(data.users[props.userIndex].details.payment.expiryYear)
      }

  useEffect(()=>{
    updatePrice()
},[data])

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    props.onClose(props.selectedValue);
  };
  const getCurrentDateTime = () => new Date();
  const handleListItemClick = (value) => {
    props.onClose(value);
  };
  const updatePrice=()=>{
    const total = data.users[props.userIndex].mycart.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price)*Number(currentValue.amount),0)
    setTotalPrice(total.toFixed(2))
}
const handleSubmit=(e)=>{
    e.preventDefault()
    if (
      cvv.length !== 3 ||
      cardNumber.length !== 19 ||
      expireMonth === 'month' ||
      expireYear === 'year' ||
      !time || // Check if time is set
      time.length !== 16 || // Check if the time is partially filled
      !agree // Check if the checkbox is checked
    ){
        setAnyFieldIsntFilled(true)
    }
    else{
        setAnyFieldIsntFilled(false)
        setExpireMonth('month')
        setExpireYear('year')
        const currentDate = getCurrentDateTime();
        const formattedDate = new Date().toLocaleDateString('en-GB');
        const formattedTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const action = {type:"PURCHASED",userIndex:props.userIndex,purchase:{
          products:data.users[props.userIndex].mycart,
          arrivalTime:time,
          orderTime:{date:formattedDate,time:formattedTime},
          totalPrice:totalPrice
        }}
        if(totalPrice>0){
          dispatch(action)
        }
        setShowPurchased(true)
    }
}
const close=(e)=>{  
    e.preventDefault();
    props.toclose(false)
    setShowPurchased(false)
}

  return (
    <div>
    <Dialog onClose={handleClose} open={open} sx={{maxHeight:700}}>
        {showPurchased?
        <div style={{width:700,height:400}}>
            <DialogTitle sx={{backgroundColor:"crimson",color:"white",height:100}}>
                <IconButton onClick={close} sx={{marginLeft:65,height:20,width:20}}>
            <CloseIcon/>
            </IconButton></DialogTitle>
            <br />
            
            <h1 style={{marginTop:50,display:"inline-flex",marginLeft:50}}><DoneAllIcon sx={{fontSize:50,color:"green",marginRight:10}}/>purchased!!</h1> 
            
        </div>:
        <form onSubmit={handleSubmit} style={{width:400}} >
        
      <DialogTitle sx={{backgroundColor:"crimson",color:"white"}}>
        Purchase Details
        <IconButton className={`animated-button ${isHoveredX ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredX(true)}
      onMouseLeave={() => setIsHoveredX(false)}
       onClick={close} sx={{float:"right",height:20,width:20,color:"white"}}>
        <CloseIcon/>
        </IconButton>
        </DialogTitle>
      <br />
      <table style={{border:"1px solid black",marginLeft:10}}>
        <tr>
            <td style={{border:"1px solid black",fontWeight:"bold"}}>items</td>
            <td style={{border:"1px solid black",fontWeight:"bold"}}>price</td>
        </tr>
        
        {data.users[props.userIndex]?.mycart.map(prod=><tr>
            <td style={{border:"1px solid black"}}>
                {prod.name}{" X "}{prod.amount }{prod.type=="vegetables"||prod.type=="fruits"||prod.type=="meat"?" Kg":" uts."}
            </td>
            <td style={{border:"1px solid black",color:"green"}}>
            {(Number(prod.price)*Number(prod.amount)).toFixed(2)}
            <EuroIcon sx={{ fontSize: 15, transform: "translateY(10%)", color: "green" }} />
            </td>
       </tr>)}
       <tr style={{fontWeight:"bold"}}>
        Total Price: <stan style={{color:"green"}}>{totalPrice}</stan><EuroIcon sx={{ fontSize: 15, transform: "translateY(10%)", color: "green" }} />
       </tr>
      </table>
      <br />

          <h4>Visa Ditails</h4>
          <div style={{ marginLeft: 10 }}>
                    <label>
                    Card Number:
        <input
          type="text"
          placeholder='XXXX-XXXX-XXXX-XXXX'
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          style={{marginLeft:5,marginBottom:7}}
        />
                    </label>
                    <br />
                    <label>
                        Expiry Date:
                        <br />
                        <select style={{fontSize:15}} value={expireMonth} onChange={(e)=>setExpireMonth(e.target.value)} >
                            <option value="month">month</option>
                            {['01','02','03','04','05','06','07','08','09','10','11','12'].map(num=><option value={num}>{num}</option>)}
                        </select>
                        
                        <select value={expireYear} style={{marginLeft:20,marginBottom:7,fontSize:15}} onChange={(e)=>setExpireYear(e.target.value)}>
                            <option  value="year">year</option>
                            {['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'].map(num=><option value={num}>{num}</option>)}
                        </select>
                    </label>

                    <br />
                    <label>
                        CVV:
                        <input
                        style={{marginLeft:7,width:30}}
                            type="text"
                            placeholder='CVV'
                            name="cvv"
                            value={cvv}
                            onChange={handleCVVChange}
                            />
                    </label>
                    <br />
                    <label >
                      <h3>Delivary Arrival Time</h3>
                      <hr /> choose your preference delivary time arrival:
                      
                      <TextField
                      sx={{marginTop:0}}
                      type='datetime-local'
                      onChange={(e)=>setTime(e.target.value)}
                      />
                      <hr />
                    </label>
                    <input type="checkbox" onChange={()=>setAgree(!agree)}/> I agree to the company policy
                    {anyFieldIsntFilled?<label style={{color:"red"}}>
                    <br /> *All Feilds Must Be Filled up
                    </label>:null}
                </div>
      <br />
      <button className={`animated-button ${isHoveredCancel ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredCancel(true)}
      onMouseLeave={() => setIsHoveredCancel(false)}
       style={{width:100,float:"right",marginRight:5,marginBottom:3,backgroundColor:"crimson",color:"white"}} onClick={close}>Cancel</button>
      <button className={`animated-button ${isHoveredPurchase ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredPurchase(true)}
      onMouseLeave={() => setIsHoveredPurchase(false)}
       type='submit' style={{width:120,float:"left",textAlign:"center" ,marginLeft:5,marginBottom:3,backgroundColor:"teal",color:"white"}}>Purchase</button>
      </form>}
    </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function PurchasePage(props) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
        toclose={props.toclose}
        userIndex={props.userIndex}
        selectedValue={selectedValue}
        open={props.open}
        onClose={handleClose}
      />
      
    </div>
  );
}
