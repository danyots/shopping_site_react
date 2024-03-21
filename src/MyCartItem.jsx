import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import EuroIcon from '@mui/icons-material/Euro';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

export default function MyCartItem(props) {
  const [img,setImg]=useState(props.prod.img)
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const data = useSelector(store=>store)

  useEffect(()=>{
setImg(props.prod.img)
  },[props.prod.img])



  const removeFromCart = ()=>{
    const action = {type:"REMOVE",name:props.prod.name,userIndex:props.userIndex}
    dispatch(action)
  }
  const substarct = () => {
    const amount = props.prod.amount; 
    const index = data.users[props.userIndex].mycart.findIndex((prod) => prod.name === props.prod.name);
    const type = "CHANGEAMOUNT";
    let action = {};
  
    if (props.prod.type === "vegetables" || props.prod.type === "fruits" || props.prod.type === "meat") {
      const remainer = Number(amount) % 0.25;
  
      if (amount >= 0.25) {
        if (remainer != 0) {
          action = { type: type, amount: (Number(amount) - remainer).toFixed(2), index: index,userIndex:props.userIndex };
        
        } else {
          action = { type: type, amount: (Number(amount) - 0.25).toFixed(2), index: index ,userIndex:props.userIndex};
          
        }
        if(action.amount==0){
          action = {type:"REMOVE",name:props.prod.name,userIndex:props.userIndex}
        }
        dispatch(action);
      }
    } else {
      const remainer = Number(amount) % 1;
  
      if (amount >= 1) {
        if (remainer != 0) {
          action = { type: type, amount: (Number(amount) - 1 + remainer).toFixed(2), index: index,userIndex:props.userIndex };
          
        } else {
          action = { type: type, amount: (Number(amount) - 1).toFixed(2), index: index ,userIndex:props.userIndex};
          
        }
        if(action.amount==0){
          action = {type:"REMOVE",name:props.prod.name,userIndex:props.userIndex}
        }
        dispatch(action);
      }
    }
  };
  const add=()=>{
    const amount = props.prod.amount; 
    const index = data.users[props.userIndex].mycart.findIndex((prod) => prod.name === props.prod.name);
    const type = "CHANGEAMOUNT";
    let action = {};
  
    if(props.prod.type=="vegetables"||props.prod.type=="fruits"||props.prod.type=="meat"){
    const remainer=Number(amount)%0.25
    if(remainer!=0){
      action = { type: type, amount:((Number(amount)+0.25-remainer).toFixed(2)), index: index,userIndex:props.userIndex };
    }
    else{
      action = { type: type, amount:(Number(amount)+0.25), index: index,userIndex:props.userIndex };
    }
    dispatch(action);
  }
  else{
    const remainer=Number(amount)%1
    if(remainer!=0){
      action = { type: type, amount:((Number(amount)+1-remainer).toFixed(2)), index: index,userIndex:props.userIndex };
    }
    else{
      action = { type: type, amount:(Number(amount)+1), index: index,userIndex:props.userIndex };
    }
    dispatch(action);
  }
    
  }
  return (
    <div style={{backgroundColor:'white'}}>
      <div style={{ backgroundColor: "Background.paper", marginTop: 5, display: "flex" }}>
        <img src={img} style={{ width: 40, height: 40 }} />
        <div style={{ transform: "translateY(20%)", marginLeft: 5, fontSize: 15, fontWeight: "bold",maxWidth:20 }}>{props.prod.name}</div>
        <div style={{ verticalAlign: 'bottom', marginLeft: 'auto',marginRight:10, marginRight: 20 }}>
          <IconButton onClick={substarct}>
            <RemoveCircleRoundedIcon sx={{ color: "teal" }} />
          </IconButton>
          <input type="number" value={Number(props.prod.amount)} step={0.25} style={{ width:props.prod.type=="vegetables"||props.prod.type=="fruits"||props.prod.type=="meat"?45: 35, height: 15, paddingLeft: 17 }} min={0} /> 
          {props.prod.type=="vegetables"||props.prod.type=="fruits"||props.prod.type=="meat"?" Kg":" uts."}
          <IconButton onClick={add} sx={{ width: 2, height: 2, marginLeft: 1 }}>
            <AddCircleRoundedIcon sx={{ color: "teal" }} />
          </IconButton>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ fontSize: 20, color: "green" }}>
            {(Number(props.prod.price)*Number(props.prod.amount)).toFixed(2)}
            <EuroIcon sx={{ fontSize: 19, transform: "translateY(10%)", color: "green" }} />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <IconButton className={`animated-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={removeFromCart}>
            <RemoveShoppingCartIcon sx={{ color: "red" }} />
          </IconButton>
        </div>
      </div>

      <Divider />
    </div>
  );
}
