import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EuroIcon from '@mui/icons-material/Euro';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSearchParams } from 'react-router-dom';
import './MyStyle.moudle.css';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import ZoomedImg from './ZoomedImg';
import EditIcon from '@mui/icons-material/Edit';
import EditProduct from './EditProduct';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
 
export default function ProductCard(props) {
  const [isHoveredImg, setIsHoveredImg] = useState(false)
  const [isHoveredEdit, setIsHoveredEdit] = useState(false)
  const [isHoveredSub, setIsHoveredSub] = useState(false)
  const [isHoveredAdd, setIsHoveredAdd] = useState(false)
  const [isHoveredAddCart, setIsHoveredAddCart] = useState(false)
  const data = useSelector(store=>store)
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false);
  const [amount,setAmount]=useState(0)
  const[openPurchasePage,setOpenPurchasePage]=useState(false)
  const[openEditProduct,setOpenEditProduct]=useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const add=()=>{
    if(props.type=="vegetables"||props.type=="fruits"||props.type=="meat"){
    const remainer=Number(amount)%0.25
    if(remainer!=0){
        setAmount((Number(amount)+0.25-remainer).toFixed(2))
    }
    else{
        setAmount(Number(amount)+0.25)
    }
  }
  else{
    const remainer=Number(amount)%1
    if(remainer!=0){
        setAmount((Number(amount)+1-remainer).toFixed(2))
    }
    else{
        setAmount(Number(amount)+1)
    }
  }
    
  }
  const substarct=()=>{
    if(props.type=="vegetables"||props.type=="fruits"||props.type=="meat"){
    const remainer=Number(amount)%0.25
    if(amount>=0.25){
        if(remainer!=0){
            setAmount((Number(amount)-remainer).toFixed(2))
        }
        else{
            setAmount(Number(amount)-0.25)
        }
      }
    }
    else{
      const remainer=Number(amount)%1
    if(amount>=1){
        if(remainer!=0){
            setAmount((Number(amount)-1+remainer).toFixed(2))
        }
        else{
            setAmount(Number(amount)-1)
        }
      }
    }
    
  }
  const addToCart = () => {
    if(Number(amount)>0){
  const isItemInCart = data.users[props.userIndex]?.mycart.some(item => item.name === props.prod.name);

  if (!isItemInCart) {
    const action = {
      type: "ADDNEW",
      product: {
        name: props.prod.name,
        img: props.prod.img,
        price: props.prod.price,
        amount: amount,
        type:props.type
      },
      userIndex:props.userIndex
    
    }
    dispatch(action);
    setAmount(0)
  } 
  
  else {
    const index = data.users[props.userIndex].mycart.indexOf( data.users[props.userIndex].mycart.find (item => item.name === props.prod.name))
    const action = {
      type:"ADDEXIST",
      product:{
        index:index,
        amountToAdd:amount
      },
      userIndex:props.userIndex
    }

    dispatch(action);
    setAmount(0)
  }
}
};

const toclosePurchasePage =()=>{
  setOpenPurchasePage(false)
}
const tocloseEditProduct =()=>{
  setOpenEditProduct(false)
}
  return (
    <Card className='card' sx={{width: 150,height:300}}>
      <div style={{marginTop:-30}}>
        <IconButton className={`animated-button ${isHoveredEdit ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredEdit(true)}
      onMouseLeave={() => setIsHoveredEdit(false)}
      onClick={()=>setOpenEditProduct(true)} sx={{marginLeft:19,borderRadius:1,width:30,height:30}}>
          <EditIcon sx={{color:"teal"}}/>
        </IconButton>
        
      </div>
      
      <CardMedia
      className={`animated-button ${isHoveredImg ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredImg(true)}
      onMouseLeave={() => setIsHoveredImg(false)}
      sx={{border:"3px solid teal",borderRadius:10}}
        component="img"
        height="100"
        image={props.prod.img}
        alt={props.prod.name}
        onClick={()=>setOpenPurchasePage (true)}
      />
      <CardContent>
        {<Typography variant="body2" color="text.secondary">
            <div style={{fontSize:20}}>
            {props.prod.name}
            </div>
            <div style={{marginLeft:-30}}>
            {props.prod.brand}
            </div>
            
        
        </Typography>}
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="teal">
        
        <div style={{display:"inline-block",fontSize:27,fontStyle:"italic",VerticalAlign: 'text-bottom',color:"green"}}>
            {props.prod.price}
            <EuroIcon sx={{fontSize:20}}/>
            <stan style={{fontSize:15,color:"black"}}>{props.type=="vegetables"||props.type=="fruits"||props.type=="meat"?" per kg":" per unit"}</stan>
            
            
        </div>
        </Typography>
        
        
      </CardContent>
      <CardContent sx={{display:"contents"}}>
      <IconButton onClick={substarct} sx={{width:2,height:2,marginRight:1}}>
        <RemoveCircleRoundedIcon className={`animated-button ${isHoveredSub ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredSub(true)}
      onMouseLeave={() => setIsHoveredSub(false)}
       sx={{color:"teal"}}/>
        </IconButton >
        
        <input type="number" value={amount} step={0.25} onChange={e=>setAmount(e.target.value)} style={{width:60,textAlign:"center",paddingLeft:17}} min={0}/> 
        {props.type=="vegetables"||props.type=="fruits"||props.type=="meat"?" kg":" uts."}
        <IconButton onClick={add} sx={{width:2,height:2,marginLeft:1}} >
        <AddCircleRoundedIcon 
        className={`animated-button ${isHoveredAdd ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHoveredAdd(true)}
        onMouseLeave={() => setIsHoveredAdd(false)}
        sx={{color:"teal"}}/>
        </IconButton> 
        <div>
        <IconButton onClick={addToCart} sx={{marginLeft:6,marginTop:0.5 }}>
         <AddShoppingCartIcon className={`animated-button ${isHoveredAddCart ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHoveredAddCart(true)}
      onMouseLeave={() => setIsHoveredAddCart(false)}
       sx={{fontSize:30,color:"teal"}}/>
         </IconButton>
            </div> 
      </CardContent>
      <ZoomedImg img={props.prod.img} name={props.prod.name} toclose={toclosePurchasePage} open={openPurchasePage}/>
      <EditProduct class={props.type} price={props.prod.price} brand={props.prod.brand} img={props.prod.img} name={props.prod.name} toclose={tocloseEditProduct} open={openEditProduct}/>
        <br />
      
    </Card>
  );
}