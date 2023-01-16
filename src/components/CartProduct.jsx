import styled from '@emotion/styled'
import { Add, ArrowBackIos, Remove } from '@mui/icons-material'
import { Box,Button,IconButton,Paper,Table,TableBody,TableCell,tableCellClasses,TableContainer,TableHead,TableRow,TextField,Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { clearAllCart, decreaseCartQuantity, getTotal, increaseCartQuantity } from '../rtk/app/features/cartSlice'
import { theme } from '../style/theme'


export const CartProduct = () => {

  const cart = useSelector((state)=>state.cart);
  const cartItems = useSelector((state)=>state.cart.cartItems);
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const totalAmount = useSelector(state=>state.cart.totalAmount);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const SHIPPING_FEES = 7.99;
  const dispatch = useDispatch();
 
  function handleBack() {
    window.history.back();
  }

  function handleRemoveItem(cartItem) {
    dispatch(decreaseCartQuantity(cartItem));
  }

  function handleAddItem(cartItem) {
    dispatch(increaseCartQuantity(cartItem));
  }

  function clearCart() {
    dispatch(clearAllCart());
  }

  React.useEffect(()=>{
    dispatch(getTotal());
  },[cart,dispatch])
  


  //Styled Components
  const StyledTableCell = styled(TableCell) ({

    [`&.${tableCellClasses.head}`] : {
      color:theme.palette.textColor.main,
      background:theme.palette.primary.main,
      fontSize:  15
    },

    [`&.${tableCellClasses.body}`] : {
      fontSize:isMobile ? 14 :  15,
    }
})

const StyledTableRow = styled(TableRow) ({
  '&:nth-of-type(odd)' : {
    background:'linear-gradient(to bottom, #D4D7DC, #E2E4E7)',
  },

  '&:last-child td, &:last-child th': {
    border:0,
  }
})



console.log(cartItems);

  return (
    <Box pt={14} mt={2}>
      <Link style={{ color:theme.palette.tertiary.main,
                    fontStyle:'italic',
                    textDecoration:'none',
                    display:'flex',
                    alignItems:'center',
                    }}

       to='/discover'>
        <ArrowBackIos fontSize='12'/>  
        <Typography variant='caption'>
          Back to shopping
        </Typography>
      </Link>

      {cartItems.length >=1 &&
      <Box display='flex' width='100%' pt={4} pb={3}
      justifyContent='flex-end' alignItems='center'>

          <Button sx={{background:'red', color:theme.palette.textColor.main,
                  marginLeft:'auto',
                  border:'1px solid transparent',
                  marginRight:'2em',
                '&:hover': {background:'#fff',
                            color:theme.palette.primary.light,
                            border:`1px solid ${theme.palette.accent.main}`}}}
                onClick={()=>clearCart()}>
                  Clear Cart
          </Button>
      </Box>}
     
       { cartItems.length>=1 && 
        <TableContainer component={Paper}
        sx={{
          boxShadow:3,
          width: isTablet ? 'max-content'  : '90%',
          display:isTablet ?'flex':'block',
          flexDirection:isTablet ? 'column' : '',
          justifyContent:isTablet ? 'center' : '',
          alignItems:isTablet ?'center' : '',
          margin:'1em auto'
        }}>
          <Table sx={{width:'100%',
                      }} aria-label='products inside the cart'>
            <TableHead>
              <TableRow>
                  <StyledTableCell>Products</StyledTableCell>                 
                  <StyledTableCell align='center'>Quantity</StyledTableCell>
                  <StyledTableCell align='center'>Price</StyledTableCell>
                  <StyledTableCell align='center'>Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((cartItem)=> (
                <StyledTableRow key={cartItem.id}>
                  <StyledTableCell align='left' width='100%'
                  sx={{
                    display:'flex',
                    flexDirection:'column'
                  }}>
                    <img src={cartItem.image_link}
                    style={{
                      objectFit:'contain',
                      maxWidth:isMobile ? '80px' : isTablet ? '100px' : '110px'
                    }}
                    alt={cartItem.name}/>
                    {cartItem.brand}
                  </StyledTableCell>

                  <StyledTableCell align='center' width='50%' sx={{
                    verticalAlign:'middle'
                  }}>
                    <IconButton size='small' onClick={()=>{handleAddItem(cartItem)}}>
                      <Add color='primary'/>
                    </IconButton>
                      <input type='text' className='quantity-value' 
                      pattern='[0-9]{2}'
                      value={cartItem.cartQuantity}/>
                    <IconButton size='small' onClick={()=>{handleRemoveItem(cartItem)}}>
                      <Remove color='primary'/>
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align='center' width='30%'>
                    $ {cartItem.price}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                  $ {parseFloat(cartItem.price* cartItem.cartQuantity).toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}

            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="center" width='100%' sx={{
                fontWeight:'bold',
              }}>$ {parseFloat(totalAmount).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total Quantity</TableCell>
              <TableCell align="center" sx={{
                fontWeight:'bold',
              }}>{totalQuantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Shipping Fees</TableCell>
              <TableCell align="center" sx={{
                fontWeight:'bold',
              }}>$ {SHIPPING_FEES}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="center" sx={{
                fontWeight:'bold',
              }}>$ {parseFloat(SHIPPING_FEES + totalAmount).toFixed(2) }</TableCell>
            </TableRow>
            </TableBody>
          </Table>    
              <Box width='100%'
              display='flex'
              justifyContent='center'>
                <Button sx={{
                  margin:'1.5em 0',
                  textAlign:'center',
                  padding:'1em',
                  background:theme.palette.primary.main,
                  color:theme.palette.textColor.main,
                  transition:'background 0.5s ease-in-out',

                  '&:hover': {
                    background:theme.palette.secondary.main,
                  }
                }}>
                  Proceed to Payment
                </Button>
              </Box>
              
        </TableContainer>}

        {cartItems.length===0 && 
        <Paper elevation={0} sx={{
          width: isMobile ? '90%' : isTablet ? '70%' : isLaptop ? '60%' : '50%',
          margin:'3em auto',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center'

        }}>
          <Box display='flex' justifyContent='center' pt={4}>
              <Box component='img' src='../assets/images/empty.png' alt='empty cart'
              sx={{width:'35%', padding:'1em',}}/>
          </Box>
          
            <Typography variant={isTablet ? 'subtitle1' : 'h5'} color={theme.palette.primary.light} textAlign='center' gutterBottom pt={4}
            fontFamily='AdsFont'>
                Your cart is currently empty
            </Typography>  
            <Typography variant={isMobile ? 'caption' : isTablet ? 'body2' : 'body1'} 
            color='#D4C7DC' textAlign='center' gutterBottom pt={2}>
                Looks like you haven't added anything into your cart yet!
            </Typography>

            <Button sx={{
                  margin:'1.5em 0',
                  textAlign:'center',
                  padding:isMobile ? '0.5em' :'0.8em',
                  background:theme.palette.secondary.main,
                  color:theme.palette.textColor.main,
                  transition:'background 0.5s ease-in-out',

                  '&:hover': {
                    background:theme.palette.primary.main,
                  }
                }}
                onClick={handleBack}
                >
                  Continue Shopping
                </Button>
            
        </Paper>}
    </Box>
  )
}


