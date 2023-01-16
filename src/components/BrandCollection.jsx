import { ExpandCircleDown, ShoppingCart } from '@mui/icons-material'
import { Card,CardActionArea, CardContent, CardMedia, Divider, IconButton, Skeleton, Typography, useMediaQuery, Box, Grow } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../rtk/app/features/cartSlice'
import { theme } from '../style/theme'
import { Loader } from './Loader'

export const BrandCollection = ({products,loadingStatus,code}) => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

    const productItemCount = products.length;
    const [numberofProductShown, setNumberofProductShown] = React.useState(12);
    const [isEnded, setIsEnded] = React.useState(false);
    const [selectedItem,setSelectedItem] = React.useState(null);

    const navigate = useNavigate();

    const showMoreProducts = () => {
        if (numberofProductShown + 5 <= productItemCount) {
            setNumberofProductShown(numberofProductShown+10);
           
        }

        else {
            setNumberofProductShown(productItemCount);
            setIsEnded(true);
        }
    }

    //Show Product Details

    const showProductDetails = (product) => {
        setSelectedItem(product);
        navigate('/product_details', { state: { product } });
        console.log(product);
    }

    let title='';
     const dispatch = useDispatch();
     const getTitle = (code) => {
         switch(code) {
             case 'glossierSelector': title='Glossier'; 
                 break;
             case 'covergirlSelector' : title='Covergirl'; 
                 break;
             case 'wet_n_wildSelector' : title ='wet N wild';
                 break;
             case 'annabelleSelector': title='Annabelle';
                 break;
             case "lorealSelector" : title = "L'Oreal Paris";
                 break;
             case 'maybellineSelector': title='Maybelline New York';
                 break;
             case 'nyxSelector' : title='NYX';
                 break;
             case 'revlonSelector':  title='Revlon';
                 break;
            
            default:title='Revlon'
         }
     }

    // React.useEffect(()=> {
    //     dispatch(fetchMakeup());        
    // })

     //Add to Cart
     const handleAddToCart = (product) => {
        dispatch(addToCart({...product, cartQuantity:1}));
    }

     getTitle(code);
     console.log(loadingStatus);
     console.log(products);

  return (
    <React.Fragment>
        <Divider textAlign='left'> 
            <Typography variant='h5' color='secondary' textTransform='uppercase'>
                    {title}
            </Typography>
        </Divider>

        {loadingStatus && <Loader/>}

        <Box display='flex'
        justifyContent='space-around'
        flexWrap='wrap'
        alignItems='center'>
            {products?.slice(0,numberofProductShown).map((product)=> {
                return (
                    <Grow in={!loadingStatus} timeout={1500}>
                        <Card 
                        key={product.id}
                        elevation={4}
                        sx={{width:'150px',
                            maxWidth:'250px',
                                //    background:!loadingStatus ? theme.palette.primary.main : 'none',
                                margin:'2em 1em',
                                flex:isMobile ? '0 0 40%' : isTablet ? '0 0 35%' : isLaptop ? '0 0 30%' : '0 0 20%'}}>
                                    
                            <CardActionArea sx={{position:'relative',padding:'0.5em'}}
                        >
                            
                                <CardMedia component='img'
                                image={product.image_link}
                                alt={product.name}
                                width='100%'
                                height='220px'
                                onClick={()=>showProductDetails(product)}
                                sx={{
                                borderRadius:'1em', 
                                objectFit:"contain"}}
                            />

                                    <IconButton size='small'
                                    onClick={()=>{handleAddToCart(product)}} 
                                sx={{background:theme.palette.secondary.main,
                                    color:'white',
                                    position:'absolute',
                                    right:'0.5em',
                                    top:'0.5em',
                                    '&:hover' : {
                                        background:theme.palette.primary.main,
                                    
                                    }
                                    }}>
                                    <ShoppingCart fontSize='18'/>
                                </IconButton>
                                
                            </CardActionArea>
                            <CardContent sx={{background: !loadingStatus ? theme.palette.secondary.main : 'none'}}>
                                
                                <Typography variant='subtitle2' color={theme.palette.textColor.main}>
                                    {product.name}
                                </Typography>
                                
                                <Typography variant='h6' color={theme.palette.textColor.main}>
                                    $&nbsp;{product.price}
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grow>
                )
            })}
        </Box>

        {(!isEnded && !loadingStatus && products.length>=1) &&
        <Box  sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
        }}>
            <IconButton onClick={showMoreProducts}>
                <ExpandCircleDown sx={{color:theme.palette.primary.dark}} fontSize='large'/>
            </IconButton>
        </Box>}
    </React.Fragment>
  )
}
