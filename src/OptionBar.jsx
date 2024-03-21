import * as React from 'react';
import './MyStyle.moudle.css';
import { useState,useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalClose from '@mui/joy/ModalClose';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PurchasePage from './PurchasePage';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import QrCode2Icon from '@mui/icons-material/QrCode2';


export default function OptionBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [prods, setProds] = useState([]);
  const data = useSelector((store) => store);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    setContentBadge();
  }, [data.users[props.userIndex].mycart]);

  const setContentBadge = () => {
    if (data != undefined) {
      setProds(data.users[props.userIndex].mycart);
    } else {
      setProds([]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const toProducts = () => {
    navigate('/home/products');
  };

  const toCustomers = () => {
    navigate('/home/customers');
  };

  const toPurchases = () => {
    navigate('/home/purchases');
  };

  const signout=()=>{
    navigate("/")
  }
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    props.search(e.target.value);
  };

  const [anchorEl, setAnchorEl] = useState();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const [toopen, setToopen] = useState();

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(!anchorEl);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>navigate("/home/customers")}>
          <Avatar sx={{height:30,width:30,marginRight:2}}/> {data.users[props.userIndex].userName} <br />
          {data.users[props.userIndex].details.private.firstName+" "+data.users[props.userIndex].details.private.lastName} 
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>navigate("/signup-private-details")}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={()=>navigate("/home/purchases")}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          my purchases
        </MenuItem>
        <MenuItem onClick={()=>navigate("/home/products")}>
          <ListItemIcon>
            <QrCode2Icon fontSize="small" />
          </ListItemIcon>
          go purchase
        </MenuItem>
        <MenuItem onClick={()=>navigate("/")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const [openPurchase, setOpenPurchase] = useState(false);

  const toclose = (arg) => {
    setOpenPurchase(arg);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  return (
    <div>
      <Drawer open={toopen} onClose={() => setToopen(false)}>
        <ModalClose sx={{ color: 'white' }} />
        <DialogTitle sx={{ fontSize: 30, fontWeight: 'bold', color: 'white' }} className='my-menu'>
          Menu
        </DialogTitle>
        <hr />
        <MenuItem sx={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} onClick={toProducts}>
          Products
        </MenuItem>
        <MenuItem sx={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} onClick={toCustomers}>
          Customers
        </MenuItem>
        <MenuItem sx={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} onClick={toPurchases}>
          Purchases
        </MenuItem>
        <MenuItem sx={{ fontSize: 25, fontWeight: 'bold', color: 'white', marginTop: 'auto' }} onClick={()=>navigate("/")}>
          <LogoutIcon  sx={{ transform: 'rotate(180deg)', fontWeight: 'bold', marginRight: 1 }} />
          Exit
        </MenuItem>
      </Drawer>
      <div className='bar'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static' style={{ backgroundColor: 'teal' }}>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={() => setToopen(!toopen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}>
                CHEAPZOL
              </Typography>
              {location.pathname === '/products' ? (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onInput={handleChange}
            value={searchValue}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      ) : null}
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton onClick={() => navigate('/home')} size='large' aria-label='show 4 new groceries' color='inherit'>
                  <HomeIcon />
                </IconButton>
                <Button onClick={()=>navigate("/about-us")} color='inherit'>About Us</Button>
                <Button onClick={()=>navigate("/contact")} color='inherit'>contact Us</Button>
                <Button onClick={signout} color='inherit'>Sign Out</Button>
                <IconButton
                  onClick={() => setOpenPurchase(true)}
                  size='large'
                  aria-label='show 4 new groceries'
                  color='inherit'
                >
                  <Badge badgeContent={prods.length} color='error'>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
      <PurchasePage userIndex={props.userIndex} toclose={toclose} open={openPurchase} />
    </div>
  );
}
