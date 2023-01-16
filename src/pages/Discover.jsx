import React from 'react'
import styled from '@emotion/styled'
import {Box,Typography, useMediaQuery, Divider, IconButton, Zoom} from '@mui/material'
import { theme } from '../style/theme'
import { Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const brands = [
        {url:'../assets/images/elf.jpg', title:'Annabelle',id:3,code:'annabelleSelector'},
        {url:'../assets/images/covergirl.webp', title:'Covergirl',id:1,code:'covergirlSelector'},        
        {url:'../assets/images/clinque.jpg', title:'Glossier', id:0,code:'glossierSelector'},
        {url:'../assets/images/loreal.jpg', title:"L'oreal",id:4,code:"lorealSelector"},
        {url:'../assets/images/maybelline.jpg', title:'Maybelline',id:5,code:"maybellineSelector"},
        {url:'../assets/images/nyx.jpg', title:'NYX',id:6,code:'nyxSelector'},
        {url:'../assets/images/revlon.jpg', title:'Revlon',id:7,code:'revlonSelector'},
        {url:'../assets/images/wetNwild.webp', title:'wet N wild',id:2,code:'wet_n_wildSelector'},
    ]

    const MaskBox = styled(Box)({
        position:'absolute',
        background:'rgba(0,0,0,0.3)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'250px',
        borderRadius:'10px 10px 0 0',
        left:0,
        top:0,
        transition:'background 2s ease-in-out'
        
    })

    const BrandImg = styled(Box) ({
        width:'100%',
        height:'250px',
        objectFit:'cover',
        borderRadius:'10px 10px 0 0',
       
    })

export const Discover = ({updateOpenBrand}) => {

    
    const match = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isHover, setIsHover] = React.useState(null);
    const [openBrand,setOpenBrand] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(()=>{
        updateOpenBrand(openBrand)
    },[openBrand])
    

    console.log(openBrand);


    const displayProducts = (code) => {
        setOpenBrand(code);
    };
    
    React.useEffect(() => {
        if (openBrand) {
            navigate("/product_brands");
        }
    }, [openBrand]);

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
                <Typography variant={isMobile ? 'h4' : 'h3' } color={theme.palette.secondary.dark}>
                    Brands Collection
                </Typography>

                
            </Divider>
            <Box 
            sx={{
                marginTop:'2em',
                width:'100%',
                display:'flex',
                flexWrap:'wrap',
                justifyContent:'space-around',
                alignItems:'center'
            }}>
                {brands.map((brand,index)=> {
                    return (
                        <Box
                        onClick={()=>{displayProducts(brand.code)}}
                        onMouseOver={()=>{setIsHover(brand.id)}}
                        key={brand.id}
                        sx={{
                        position:'relative',
                        boxShadow:3,
                        background:theme.palette.tertiary.main,
                        borderRadius:'10px 10px 0 0',
                        width:'150px', 
                        height:'fit-content',
                        margin:'2em',
                        flex: isMobile ? '0 0 60%' : match ? '0 0 40%' : '0 0 25%',
                        
                        }}>
                            <BrandImg component='img' src={brand.url} alt={brand.title}/>
                            
                            
                            {isHover===brand.id &&
                            
                                <MaskBox>
                                    <Zoom in={isHover===brand.id} mountOnEnter unmountOnExit 
                                    timeout={500}>
                                        <IconButton size='large' 
                                        sx={{background:theme.palette.textColor.main,
                                            '&:hover': {
                                                background:theme.palette.accent.main,
                                            }
                                            }} >
                                            <Search sx={{color:'primary'}}/>
                                        </IconButton>
                                    </Zoom>
                                </MaskBox>
                            
                            
                            }
                            
                            
                            <Typography variant='h6' gutterBottom color='#fff' textAlign='center'>
                                {brand.title}
                            </Typography>
                        </Box>
                            
                        )
                })
            }
    
            </Box>
        
    </Box>
    
  )
}
