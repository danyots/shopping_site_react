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
    const data = useSelector(store=>store)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(props.open);
    const [classProduct,setClassProduct]=useState('choose')
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const [img,setImg]=useState()
    const [brand,setBrand]=useState('')
    const [priceBelowZero,setPriceBelowZero]=useState(false)
    const [fieldsMissing,setFieldsMissing]=useState(false)
    const [isItemExist,setIsItemExist]=useState(false)
    const [isHoveredX, setIsHoveredX] = useState(false)
    const [isHoveredCancel, setIsHoveredCancel] = useState(false)
    const [isHoveredAdd, setIsHoveredAdd] = useState(false)

    useEffect(() => {
        setOpen(props.open);
      }, [props.open]);
const close=(e)=>{  
    e.preventDefault();
    props.toclose(false)
}
const handleClose = () => {
    props.onClose(props.selectedValue);
  };
  const handleSubmit=(e)=>{

    setPriceBelowZero(false)
    setFieldsMissing(false)
    if(name===undefined||img===undefined||price===undefined||classProduct==='choose'){
        e.preventDefault()
        setFieldsMissing(true)
    }
    if(price==0){
        e.preventDefault()
        setPriceBelowZero(true)
    }
    
    if(!fieldsMissing&&!priceBelowZero){
        const itemExist = data.products[classProduct].some(item=>item.name==name)
        if(itemExist){
            e.preventDefault()
            setIsItemExist(true)
        }
        else{
            e.preventDefault()
            const product ={
                name:name,
                img:img,
                brand:brand,
                price:price
            }
            const action = {type:"ADDPRODUCT",product:product,class:classProduct}
            dispatch(action)
            props.toclose(false)
        }
        
    }
    
  }

  return (
    <div>
<Dialog onClose={handleClose} open={open} sx={{maxHeight:700}}>
<DialogTitle sx={{height:30,color:"white",backgroundColor:"teal",paddingBottom:3}}>
    <div style={{fontSize:25,textAlign:"center"}}>
        Add Product To Store
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
    select item class:
    <select onChange={(e)=>setClassProduct(e.target.value)}>
        <option value="choose">choose class</option>
        <option value="vegetables">vegetables</option>
        <option value="fruits">fruits</option>
        <option value="dairies">dairies</option>
        <option value="meat">meat</option>
        <option value="housekeeping products">housekeeping products</option>
    </select>
    <br /><br />
    product name: <input onChange={(e)=>setName(e.target.value)} placeholder='product name' style={{marginBottom:10,marginRight:30}} type="text" />
    price: <input onChange={(e)=>setPrice(e.target.value)} placeholder='price' min={0} step={0.01} style={{marginBottom:10,width:50}} type="number" /> <EuroIcon sx={{fontSize:13, transform: "translateY(20%)",color:"green"}}/>
    <br />
    image source: <input onChange={(e)=>setImg(e.target.value)} placeholder='image source' style={{marginBottom:10,marginRight:30,width:"250px"}} type="text" />

    <br />
    add description brand: <input onChange={(e)=>setBrand(e.target.value)} placeholder='brand here' style={{marginRight:30}} type="text" /> <br />
    {fieldsMissing?<div><stan style={{color:"red"}}>*some fields are empty</stan><br /></div>:null}
    {priceBelowZero?<div><stan style={{color:"red"}}>*price cannot be a zero</stan><br /></div>:null}
    {isItemExist?<div><stan style={{color:"red"}}>*item already exists in store</stan><br /></div>:null}
    <button className={`animated-button ${isHoveredCancel ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredCancel(true)}
      onMouseLeave={() => setIsHoveredCancel(false)}
       style={{width:100,float:"right",marginTop:100,marginRight:5,marginBottom:3,backgroundColor:"crimson",color:"white"}} onClick={close}>Cancel</button>
      <button className={`animated-button ${isHoveredAdd ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredAdd(true)}
      onMouseLeave={() => setIsHoveredAdd(false)}
       type='submit' style={{width:120,marginTop:100,float:"left",textAlign:"center" ,marginLeft:5,marginBottom:3,backgroundColor:"teal",color:"white"}}>Add Item</button>
</form>
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

export default function AddProduct(props) {
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
        onClose={handleClose}
      />
    </div>
  );
}
