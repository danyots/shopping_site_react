import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomePage from './HomePage';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div >
      <HomePage/>
  </div>
  )
}

export default App
