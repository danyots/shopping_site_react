import React from 'react'
import OptionBar from './OptionBar'
import { Route,Routes } from 'react-router-dom'
import Products from './Products'
import Customers from './Customers'
import Purchases from './Purchases'
import Home from './Home'
import Welcome from './Welcom'
import Login from './Login'
import SignUpPrivateDetails from './SignUpPrivateDetails'
import SignUpPaymentDetails from './SignUpPaymentDetails'
import SignUpDelivaryDetails from './SignUpDelivaryDetails'
import NewUser from './NewUser'
import ForgotPassword from './ForgotPassword'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'


export default function HomePage() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="/signup-private-details" element={<SignUpPrivateDetails/>}/>
      <Route path="/signup-payment-details" element={<SignUpPaymentDetails/>}/>
      <Route path="/signup-delivary-details" element={<SignUpDelivaryDetails/>}/>
      <Route path="/new-user" element={<NewUser/>}/>
      <Route path="/contact" element={<ContactUs/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/products" element={<Products/>}/>
      <Route path="/home/customers" element={<Customers/>}/>
      <Route path="/home/purchases" element={<Purchases/>}/>
      </Routes>
    </div>
  )
}
