import { KeyboardArrowUp, Search, ShoppingCart} from '@mui/icons-material'
import {Fab, Box, Card, CardActionArea, CardContent, CardMedia, Divider, Grow, IconButton, InputAdornment, Skeleton, TextField, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../rtk/app/features/cartSlice'
import { theme } from '../style/theme'
import { Loader } from './Loader';


export const ProductCard = ({title,products,loadingStatus}) => {
    //ScreenSize
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
    //For addToCart
    const cartItems = useSelector((state)=>state.cart.cartItems);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const navigate = useNavigate();
    //ForSearchQuery
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState(products);
    //For scrollToSeeMore
    const [itemsToShow, setItemsToShow] = React.useState(12);

    const inputRef = React.useRef(null);
    const dispatch = useDispatch();

    //Add to Cart
    const handleAddToCart = (product) => {
        dispatch(addToCart({...product, cartQuantity:1}));
    }
    //Show Product Details
    const showProductDetails = (product) => {
        const cartProduct = cartItems.find(cartItem => cartItem.id === product.id);
        const cartQuantity = cartProduct ? cartProduct.cartQuantity : 0;
        setSelectedItem(product);
        navigate('/product_details', { state: { product, cartQuantity } });
        console.log(product);
    }
    
    //console.log(loadingStatus)

    //SearchBar component
    React.useEffect(() => {
        if(searchQuery === ''){
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, products]);
    
    const handleSearch = e => {
        setSearchQuery(inputRef.current.value);
    }

    const SearchBar = 
        (
        <form className='search-bar-container'>
            <TextField id='search-bar'
            hiddenLabel
            value={searchQuery}
            inputRef={inputRef}
            onChange={handleSearch}
            variant='outlined'
            placeholder='Search...'
            size='small'
            sx={{ 

                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.secondary.light,
                        borderRadius:10,
                        fontSize: isMobile ? 16 : 14,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.secondary.dark,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.tertiary.main,
                      },
                    },


                }}
            InputProps={{
                style: {fontSize: 16},
                endAdornment: 
                <InputAdornment position='end'>
                    <Search style={{fill:theme.palette.secondary.light}}/>
                </InputAdornment>
            
                }}/>           
        </form>
  );

  //Scroll To Top
  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

//ScrollToSeeMore
const productRefs = React.useRef([]);
React.useEffect(() => {
    // Get the last item from the filteredProducts array
    const lastItemRef = productRefs.current[productRefs.current.length - 1];

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setItemsToShow((prev) => prev + 6);
            }
        });
    }, { threshold: 0.05 });
    

    // Observe the last item
    if (lastItemRef) {
        observer.observe(lastItemRef);
    }

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            setItemsToShow((prev) => prev + 6);
        }
    });
    

    return () => {
        //disconnect observer
        window.removeEventListener("scroll", () => {
          if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
              setItemsToShow((prev) => prev + 6);
          }
      });
      };
}, [filteredProducts]);



  return (
    <Box sx={{paddingTop:'4em'}}>
        <Divider variant='middle' sx={{
            marginTop:'3.5em',
            "&.MuiDivider-root": {
                "&::before, &::after": {
                    borderTopColor:theme.palette.secondary.main,
                    borderTopWidth:'thin',
                    borderTopStyle:'solid'
                },
            }
        }}>
            <Typography variant={isMobile ? 'h4' : 'h3' } 
            color={theme.palette.secondary.dark}>
                {title}
            </Typography>           
        </Divider>
        {SearchBar}
        {loadingStatus && <Loader/>}

        <Box sx={{display:'flex',
                 justifyContent:'space-evenly',
                 alignItems:'center',
                 flexWrap:'wrap',
                 marginTop:'1em'}}>

                 
        {
        filteredProducts?.slice(0,itemsToShow).map((product)=> {
            return (
                <Grow in={!loadingStatus} timeout={1500}>
                    <Card 
                    ref={el => productRefs.current.push(el)}
                    key={product.id}
                    elevation={4}
                    sx={{width:'150px',
                        maxWidth:'250px',
                            //    background:!loadingStatus ? theme.palette.primary.main : 'none',
                            margin:'2em 1em',
                            flex:isMobile ? '0 0 60%' : isTablet ? '0 0 35%' : isLaptop ? '0 0 30%' : '0 0 20%'}}>
                                
                        <CardActionArea sx={{position:'relative',padding:'0.5em'}}>
                            {loadingStatus ? 

                            <Skeleton variant='rectangular' width='100%' height='220px'
                            sx={{borderRadius:'1em'}} animation='wave'/>
                            :
                            <CardMedia component='img'
                            image={product.image_link}
                            alt={product.name}
                            width='100%'
                            height='220px'
                            sx={{
                            borderRadius:'1em', 
                            objectFit:"fill"}}
                            onClick={()=> showProductDetails(product)}/>}

                            {loadingStatus ? 

                            <Skeleton variant='circular' width={30} height={30} animation='wave' 
                            sx={{
                                position:'absolute',
                                right: '1em',
                                top:'0.8em',
                            }}/>
                            :   
                                <IconButton size='small' 
                                onClick={()=>handleAddToCart(product)}
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
                            </IconButton>}
                            
                        </CardActionArea>
                        <CardContent sx={{background:!loadingStatus ? theme.palette.secondary.main: 'none'}}>
                            {loadingStatus ? 
                            <Skeleton variant='text' animation="wave" sx={{fontSize:'1.5em'}}/>
                            :
                            <Typography variant='subtitle2' color={theme.palette.textColor.main}>
                                {product.name}
                            </Typography>}

                            {loadingStatus ? 
                            <Skeleton variant='text' animation="wave" sx={{fontSize:'2.5em'}}/>
                            :
                            <Typography variant='h6' color={theme.palette.textColor.main}>
                                $&nbsp;{product.price}
                            </Typography>}
                        </CardContent>
                        
                    </Card>
                </Grow>
            )
        })}
        
        </Box>

        <Fab
        color='#555'
        aria-label="scroll to top"
        onClick={handleScrollToTop}
        sx={{
            position: "fixed",
            bottom: "1em",
            right: "1em",
        }}
        >
             <KeyboardArrowUp color='secondary'/>
        </Fab>

        
        
    </Box>
  )
}
