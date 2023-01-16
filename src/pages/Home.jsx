import { Box, Button, CssBaseline, Paper, Typography, useMediaQuery} from '@mui/material';
import { theme } from '../style/theme';
import React from 'react'
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const SliderImage = styled(Box)({
    margin:'0 auto',
    width:'100%',
    height:'100%',
    objectFit:'cover',
})

const ShopBtn = styled(Button) ({
    marginTop:'2em',
    padding:'0.5em 3em',
    fontSize:18,
    color:'white',
    border:`2px solid ${theme.palette.textColor.main}`,
    fontWeight:'bold',
    '&:hover': {
        color:theme.palette.secondary.main,
        background:'white',
    }

})


export const Home = () => {

    const matchScreen = useMediaQuery(theme.breakpoints.down('md'))
    const mobileScreen = useMediaQuery(theme.breakpoints.down('sm'))
    let productImage = [
        {
            url:'../assets/images/slider_1.jpg',
            title:'Product Ads Image One'
        },

        {
            url:'../assets/images/slider_2.jpg',
            title:'Product Ads Image Two',
        },

        {
            url:'../assets/images/slider_3.jpg',
            title:'Product Ads Image Three',
        },

        {
            url:'../assets/images/slider_4.jpg',
            title:'Product Ads Image Four',
        },
    
    ];

    let services = [{url:'../assets/images/fast_delivery.svg',
                    name:'Fast Delivery'},
                    {url:'../assets/images/quality_assurance.svg',
                    name:'Quality Assurance'},
                    {url:'../assets/images/easy_return.svg',
                    name:'Easy Return'},
                    {url:'../assets/images/secure_payment.svg',
                    name:'Secure Payment'}];

    const navigate = useNavigate();


  return (
    <CssBaseline>
        <Box name='home_section'
    sx={{
        padding:'4.5em 0 0 0 !important',
        margin:'0 !important',
        width:'100%',
        height:'auto',
        }}>
            <Carousel 
                height='88vh'
                autoPlay='true'
                animation='slide'
                duration='500'
                navButtonsAlwaysVisible='true'
                indicatorContainerProps={{
                    style: {
                       position:'absolute',
                       bottom:30,
                       zIndex:2,
                    }
            
                }}

                indicatorIconButtonProps={{
                    style: {
                        padding: '7px' ,
                        justifyContent:'center',
                        alignItems:'center',
                        color: theme.palette.secondary.light,
                    }
                }}

                activeIndicatorIconButtonProps={{
                    style: {
                        color: theme.palette.primary.main 
                    }
                }}

                NextIcon={<ArrowForwardIosIcon/>}
                PrevIcon={<ArrowBackIosNewIcon/>}
                fullHeightHover='true'

                navButtonsProps={{      
                    style: {
                        backgroundColor: theme.palette.primary.light,
                        
                    }
                }}
                >
                {productImage.map((product,index)=> (
                    <Box key={index} sx={{
                        width:'100%',
                        height:'100%',
                        margin:'0 auto',
                      
                    }}>
                        <SliderImage component='img' src={product.url} alt={product.title} />

                            <Paper sx={{
                            position:'absolute',
                            top:0,
                            color:'white',
                            width:'100%',
                            height:'100%',
                            display:'flex',
                            flexDirection:'column',
                            fontFamily:theme.typography.fontFamily,
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            fontWeight:'bolder',
                            background:'rgba(0,0,0,0.8)',
                    
                        }}>
                            <Typography variant={matchScreen ? 'h3' : 'h1'} color=
                            {theme.palette.tertiary.main}>
                                    WINTER SALE
                                <Typography variant={matchScreen ? mobileScreen ? 'h5' : 'h4' : 'h3'}
                                 color='white'
                                 sx={{textTransform:'uppercase'}}>
                                    New trending collections 
                                </Typography>
                            </Typography>
                            <ShopBtn onClick={()=>navigate('/discover')}>SHOP</ShopBtn>  
                        </Paper>                    
                    </Box>
                ))}

                
            </Carousel>
            
            <Box my={2} py={3} px={4} width='100%' height='auto'>
                <Box display='flex' justifyContent='space-around'
                flexDirection={mobileScreen ? 'column' : 'row'}
                alignItems='center' flexWrap='wrap'>

                {services.map((service)=> 
                   ( <Box key={service.url} display='flex'
                   alignItems='center' alignContent='center'
                   flex={matchScreen ? '0 0 40%' : '0 0 20%'}
                   flexDirection= 'column' width={mobileScreen ? '100%' :'20%'}>
                        <Box component='img' src={service.url}
                        mt={mobileScreen ? '1.5em' : ''}
                        alt='available services' width='45%' height='100px'/>
                        <Typography variant='h6' color='secondary' gutterBottom textAlign={mobileScreen ? 'center' : ''}>
                            {service.name}
                        </Typography>
                        <Typography variant='body2' color='#555' textAlign= 'center'
                        width='100%'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Doloremque placeat 
                            
                        </Typography>
                    </Box>)
                )}
                </Box>
            </Box>
        </Box>
    </CssBaseline>
    
  )
}
