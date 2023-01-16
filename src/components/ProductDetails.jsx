import { Add, ArrowBackIos, Circle, Remove } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Rating, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart} from '../rtk/app/features/cartSlice';
import { theme } from '../style/theme'


export const ProductDetails = () => {

    const [product, setProduct] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);
    const location = useLocation();
    const dispatch = useDispatch();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

    React.useEffect(() => {
        const { state } = location;
        setProduct(state ? state.product : null);
        if(product && product.cartQuantity) {
            setQuantity(product.cartQuantity);
            console.log(product.cartQuantity);
        }

        
      }, [location,setProduct,product]);

  
       function handleRemoveItem() {
        if(quantity>=1) {
            setQuantity(quantity - 1);
        }
       }
    
       function handleAddItem() {
        setQuantity(quantity + 1);
       }

       const handleAddToCart = (product) => {
        console.log(quantity);
        dispatch(addToCart({...product, cartQuantity:quantity}));
        console.log(quantity, "-Type of quantity:",typeof(quantity));
            
     }
     
     console.log(quantity);
     

  return (
    <Box pt={10} px={2} my={3}>
        <IconButton onClick={()=>window.history.back()} size='medium'>
             <ArrowBackIos color='tertiary'/>
        </IconButton>
        
       {product!=null && 
        <Box sx= {{width: isMobile ? '80%' : isTablet ? '90%' : '85%', 
        margin:'1em auto 0 auto', boxShadow:3, padding:'1em 0 0.5em 0'}}>
            <Typography variant='h6' color='secondary' textAlign='center'>
                {product.name}
            </Typography>
            
            <Box display='flex'
            justifyContent='space-between' 
            alignItems={isTablet ? 'center' : ''}
            flexDirection={isTablet? 'column' : 'row'}>
                <Box py={1} mx={2} width={isMobile ? '70%' : isTablet ? '50%' : '40%'} display='flex'
                justifyContent='center' alignItems='center'
                flexDirection='column'>
                    <Box component='img'
                    sx={{objectFit:'contain', borderRadius:'20px', paddingBottom:'1em'}}
                    src={product.image_link}
                    alt={product.name}
                    width={isMobile? '90%' : isTablet ? '60%' : isLaptop ? '70%' : '50%'}/>
                    
                    <Typography variant='caption' component='h6'
                    textAlign='center'
                    color={theme.palette.primary.light}>
                        Brand: {product.brand}
                    </Typography>
                </Box>
                <Box py={2} mx={2} width={isLaptop? '85%' : '60%'}>
                    <Typography variant='caption' component='h6'
                    color={theme.palette.primary.light}
                    gutterBottom pb={2}
                    sx={{width: isTablet ? '100%' : isLaptop ? '88%' : '85%'}}>
                        Description:<br/>
                        {product.description}
                    </Typography>

                    {product.category &&
                    <Typography variant='caption' component='h6'
                    color ={theme.palette.primary.light} gutterBottom>
                        Category : {product.category}</Typography>}

                    <Typography variant='caption' component='h6'
                    color ={theme.palette.primary.light} gutterBottom>
                        Rating : 
                        <Rating value={product.rating} name='product_rating' readOnly
                        size='small' sx={{verticalAlign:'middle'}}/>
                    </Typography>
                    
                    
                    {product.product_colors.length >=1 &&
                    <Typography variant='caption' component='h6'
                    color ={theme.palette.primary.light}>Available Colours :&nbsp;
                        {product.product_colors.map((color)=> (
                            <Tooltip title={color.colour_name}>
                                <Circle sx={{color:color.hex_value, verticalAlign:'middle'}}/>
                            </Tooltip>
                        ))}
                        
                    </Typography>}
                    {product.tag_list.length >=1 &&
                    <Typography variant='caption' component='h6'
                    color={theme.palette.primary.light}>Product Tags : 
                        {product.tag_list.map((tag)=>(
                            <Chip label={tag} variant='outlined'/>
                        ))}
                    </Typography>}

                    <Box display='flex' 
                    justifyContent='space-around' 
                    width='100%' alignItems='center'
                    flexDirection={isMobile ? 'column' : 'row'}>
                        
                        <Box width='50%' py={2}>
                            <IconButton size='small' onClick={()=>{handleAddItem(product)}}>
                                <Add color='primary'/>
                            </IconButton>
                            <input type='number' className='quantity-value-details' 
                                pattern='[0-9]{2}' readOnly
                                value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            <IconButton size='small' onClick={()=>{handleRemoveItem(product)}}>
                                <Remove color='primary'/>
                            </IconButton>
                        </Box>

                        <Button disabled={quantity===0 ? true : false}
                                sx={{background:theme.palette.secondary.main,
                                    transition:'background 1s ease-in-out',
                                    padding:'0.5em 2em',
                                    margin:'1em',
                                    color:theme.palette.textColor.main,
                                    ":disabled" : {
                                        color:theme.palette.textColor.main,
                                        background:theme.palette.primary.light,
                                    },
                                    '&:hover': {
                                        background:theme.palette.primary.main,
                                    }}}
                                    onClick={()=>{handleAddToCart(product)}}>
                                Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>}
    </Box>
  )
}
