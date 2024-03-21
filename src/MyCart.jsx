import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import MyCartItem from './MyCartItem'
import EuroIcon from '@mui/icons-material/Euro';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PurchasePage from './PurchasePage';
import { useNavigate } from 'react-router-dom';

export default function MyCart(props) {
    const data = useSelector(store=>store)
    const navigate = useNavigate()

const [totalPrice,setTotalPrice]=useState(0)
const [itemsAmount,setItemsAmount]=useState(0)
const [open,setOpen]=useState(false)
useEffect(()=>{
    updatePrice()
    updateAmount()
},[data])
const [isHovered, setIsHovered] = useState(false)
    const updatePrice=()=>{
        const total = data.users[props.userIndex].mycart.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue.price)*Number(currentValue.amount),0)
        setTotalPrice(total.toFixed(2))
    }
    const updateAmount=()=>{
        setItemsAmount(data.users[props.userIndex].mycart.length)
    }
    const openPurchasePage=()=>{
        setOpen(true)
    }
    const toclose=(arg)=>{
        setOpen(arg)
    }

  return (
    <div className='my-cart' style={{overflowX:"hidden",marginLeft:13,border:"2px solid black",width:323 }}>
        <h4 style={{textAlign:"center"}}>My Cart</h4>
        <div style={{display:"inline-flex"}}>
        <stan style={{fontWeight:"bold"}}>Total Price:</stan>
        <stan style={{color:"green",fontWeight:"bold"}}>
            {totalPrice} 
            <EuroIcon sx={{ fontSize: 16, transform: "translateY(10%)", color: "green" }} />
        </stan>
        </div>
        <div style={{display:"inline-flex",float:"right"}}>
        <stan style={{fontWeight:"bold"}}>Items selected:</stan>
        <stan style={{color:"green",fontWeight:"bold"}}>{itemsAmount}  </stan>
        </div>
        <div style={{textAlign:"center",backgroundColor:"teal",borderRadius:5}}>
            <h5>Your Items</h5>
        </div>
        <div style={{textAlign:"center"}}>
        {data.users[props.userIndex]?.mycart.length==0?<stan style={{fontWeight:"bold"}}>{"No Products Yet"}</stan>:<div>
            {data.users[props.userIndex]?.mycart.map(product=><MyCartItem userIndex={props.userIndex} prod={product}/>)}
            <br />
            <button className={`animated-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
       onClick={openPurchasePage} style={{display:"inline-flex", backgroundColor:"crimson",color:"white",border:"2px solid gray"}}>
                <ShoppingCartCheckoutIcon/> Purchase 
            </button>
            </div>
            }
        </div>
        <PurchasePage userIndex={props.userIndex} toclose={toclose} open={open}/>
        <br />
    </div>
  )
}
