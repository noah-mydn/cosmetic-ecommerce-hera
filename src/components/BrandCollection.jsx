import {  FilterList, KeyboardArrowUp, ShoppingCart } from '@mui/icons-material'
import { Card,CardActionArea, CardContent, CardMedia, Divider, IconButton, Typography, useMediaQuery, Box, Grow, Fab, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Tooltip, Menu } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../rtk/app/features/cartSlice'
import { theme } from '../style/theme'
import { Loader } from './Loader'
import Fade from '@mui/material/Fade';

export const BrandCollection = ({products,loadingStatus,code}) => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
    const [filteredProducts,setFilteredProducts] = React.useState(products);
    const [selectedItem,setSelectedItem] = React.useState(null);

    const navigate = useNavigate();

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

     getTitle(code);

     //Add to Cart
     const handleAddToCart = (product) => {
        dispatch(addToCart({...product, cartQuantity:1}));
    }
 //Scroll To Top
 function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
    //ScrollToSeeMore
const productRefs = React.useRef([]);
const [itemsToShow, setItemsToShow] = React.useState(12);
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
}, [products]);

     //console.log(products)
     
     //Selector
     const categories = [{name:'All', key:'all'}, 
                        {name:'Blush',key:'blush'}, 
                        {name:'Bronzer', key:'bronzer'}, 
                        {name:'Eye shadow', key:'eyeshadow'}, 
                        {name:'Eyeliner', key:'eyeliner'}, 
                        {name:'Foundation', key:'foundation'}, 
                        {name:'Lipstick', key:'lipstick'}, 
                        {name:'Mascara',key:'mascara'} , 
                        {name:'NailPolish',key:'nail_polish'}];

    const ITEM_HEIGHT = 48;

    const handleShowFilterProducts = (key) => {
        let selectedProductType;

        if(key==='all') {
            setFilteredProducts(products);
        }

        else {
            selectedProductType = products.filter((product)=>product.product_type===key);
            setFilteredProducts(selectedProductType)
        }
    }

 const Selector = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <Box width='100%' py={3} px={4}
    display='flex' justifyContent='flex-end'
    >
      <IconButton
        aria-label="more"
        id="filter-menu"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterList />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'filter-menu',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          style: {
            elevation:0,
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '18ch',
          },
        }}
      >
        {categories.map((option) => (
          <MenuItem key={option.key} onClick={()=>{handleShowFilterProducts(option.key)}}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

    console.log("filter:",filteredProducts);
     

  return (
    <React.Fragment>
        <Divider textAlign='left'> 
            <Typography variant='h5' color='secondary' textTransform='uppercase'>
                    {title}
            </Typography>
        </Divider>
        <Selector/>
        {loadingStatus && <Loader/>}
        {filteredProducts.length===0 &&
            <Box height='calc(100vh - 420px)' display='flex'
            justifyContent='center' alignItems='center'>
                <Typography variant='subtitle2' color='primary'
                fontStyle='italic'>
                    No products found
                </Typography>
            </Box>}
        <Box display='flex'
        justifyContent='space-around'
        flexWrap='wrap'
        alignItems='center'>
            {filteredProducts?.slice(0,itemsToShow).map((product)=> {
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

        <Fab size='small'
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
    </React.Fragment>
  )
}
