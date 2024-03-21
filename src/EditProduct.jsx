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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const data = useSelector(store=>store)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(props.open);
    const [name,setName]=useState(props.name)
    const [classProduct,setClassProduct]=useState(props.class)
    const [price,setPrice]=useState(props.price)
    const [img,setImg]=useState(props.img)
    const [brand,setBrand]=useState(props.brand)
    const [priceBelowZero,setPriceBelowZero]=useState(false)
    const [fieldsMissing,setFieldsMissing]=useState(false)
    const [isItemExist,setIsItemExist]=useState(false)
    const [isHoveredX, setIsHoveredX] = useState(false)
    const [isHoveredRemove, setIsHoveredRemove] = useState(false)
    const [isHoveredCancel, setIsHoveredCancel] = useState(false)
    const [isHoveredEdit, setIsHoveredEdit] = useState(false)

    useEffect(() => {
        setOpen(props.open);
      }, [props.open]);
      useEffect(() => {
        setName(props.name);
      }, [props.name]);
      useEffect(() => {
        setBrand(props.brand);
      }, [props.brand]);
      useEffect(() => {
        setPrice(props.price);
      }, [props.price]);
      useEffect(() => {
        setImg(props.img);
      }, [props.img]);
const close=(e)=>{  
    e.preventDefault();
    props.toclose(false)
}
const handleClose = () => {
    props.onClose(props.selectedValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    setPriceBelowZero(false);
    setFieldsMissing(false);
  
    if (img === '' || price === '') {
      setFieldsMissing(true);
      return; // Exit early if fields are missing
    }
  
    if (Number(price) === 0) {
      setPriceBelowZero(true);
      return; // Exit early if price is zero
    }
  
    // Rest of the code for handling a valid form submission
    const product = {
      name: name,
      img: img,
      brand: brand,
      price: price,
    };
    let index=-1
    if(classProduct=="housekeeping products"){
          index = data.products["housekeepers"].indexOf(
            data.products["housekeepers"].find((item) => item.name === name)
          )
    }
    else if(classProduct=="dairy products"){
          index = data.products["diaries"].indexOf(
            data.products["diaries"].find((item) => item.name === name)
          )
    }
    else{
            index = data.products[classProduct].indexOf(
                data.products[classProduct].find((item) => item.name === name)
              )
    }
  
    
    if(classProduct=="housekeeping products"){
        const action = {
            type: "EDITPRODUCT",
            product: product,
            class: "housekeepers",
            index: index
            ,userIndex:props.userIndex
          };
          dispatch(action);
        
          props.toclose(false);
    }
    else if(classProduct=="dairy products"){
        const action = {
            type: "EDITPRODUCT",
            product: product,
            class: "diaries",
            index: index,
          };
          dispatch(action);
        
          props.toclose(false);
    }
    else{
        const action = {
            type: "EDITPRODUCT",
            product: product,
            class: classProduct,
            index: index,
          };
          dispatch(action);
        
          props.toclose(false);
    }
    
  };
  
  const remove=()=>{
    if(classProduct=="housekeeping products"){
        const action={type:"REMOVEPRODUCT",name:name,class:"housekeepers"}
    dispatch(action);
    props.toclose(false);
    }
    else if(classProduct=="dairy products"){

        const action={type:"REMOVEPRODUCT",name:name,class:"diaries"}
    dispatch(action);
    props.toclose(false);
    }
    else{
        const action={type:"REMOVEPRODUCT",name:name,class:classProduct}
        dispatch(action);
        props.toclose(false);
    }
    
  }

  return (
    <div>
<Dialog onClose={handleClose} open={open} sx={{maxHeight:700}}>
<DialogTitle sx={{height:30,color:"white",backgroundColor:"teal",paddingBottom:3}}>
    <div style={{fontSize:25,textAlign:"center"}}>
        Edit Product
<IconButton onClick={close} sx={{float:"right",height:20,width:20}}>
        <CloseIcon className={`animated-button ${isHoveredX ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredX(true)}
      onMouseLeave={() => setIsHoveredX(false)}
      sx={{fontSize:20,color:"white"}}/>
        </IconButton>
        </div>
        </DialogTitle>
<div style={{backgroundImage:"url("+"https://thumbs.dreamstime.com/b/abstract-blue-pastel-blurred-smooth-background-color-gradient-wall-can-used-creative-concept-add-product-101948459.jpg"+")"}}>
<form onSubmit={handleSubmit} style={{marginLeft:10,marginRight:10,fontWeight:"bold"}} >
    <br />

    product name: <input value={name}   style={{marginBottom:10,marginRight:30}} type="text" />
    price: <input value={price} step="0.01" onChange={(e)=>setPrice(e.target.value)}  min={0} style={{marginBottom:10,width:50}} type="number" /> <EuroIcon sx={{fontSize:13, transform: "translateY(20%)",color:"green"}}/>
    <br />
    image source: <input value={img} onChange={(e)=>setImg(e.target.value)}  style={{marginBottom:10,marginRight:30,width:"250px"}} type="text" />

    <br />
    description brand: <input value={brand} onChange={(e)=>setBrand(e.target.value)}  style={{marginRight:30}} type="text" /> <br />
    {fieldsMissing?<div><stan style={{color:"red"}}>*some fields are empty</stan><br /></div>:null}
    {priceBelowZero?<div><stan style={{color:"red"}}>*price cannot be a zero</stan><br /></div>:null}
    <button className={`animated-button ${isHoveredCancel ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredCancel(true)}
      onMouseLeave={() => setIsHoveredCancel(false)}
      style={{width:100,float:"right",marginTop:100,marginRight:5,marginBottom:3,backgroundColor:"crimson",color:"white"}} onClick={close}>Cancel</button>
      <button className={`animated-button ${isHoveredEdit ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredEdit(true)}
      onMouseLeave={() => setIsHoveredEdit(false)} type='submit' style={{width:120,marginTop:100,float:"left",textAlign:"center" ,marginLeft:5,marginBottom:3,backgroundColor:"teal",color:"white"}}>Edit Item</button>
</form>
<br />
<IconButton onClick={remove} sx={{marginLeft:-15,width:10,height:10}}>
    <DeleteOutlineIcon className={`animated-button ${isHoveredRemove ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredRemove(true)}
      onMouseLeave={() => setIsHoveredRemove(false)} sx={{fontSize:35,color:"darkred"}}/>
</IconButton>
</div>
    </Dialog>
    </div>
    
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function EditProduct(props) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
      toclose={props.toclose}
        selectedValue={selectedValue}
        open={props.open}
        name={props.name}
        img={props.img}
        brand={props.brand}
        class={props.class}
        price={props.price}
        onClose={handleClose}
      />
    </div>
  );
}
