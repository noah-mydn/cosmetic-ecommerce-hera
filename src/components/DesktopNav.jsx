import React from 'react'
import styled from '@emotion/styled'
import { AppBar, Badge, IconButton, ListItemButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../style/theme'
import { ShoppingBasket } from '@mui/icons-material'
import { MAIN_MENU } from '../data/navData'
import { Link, useNavigate } from 'react-router-dom'

const UpperRowNav = styled(Box) ({
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
})

const NavContainer = styled(Box)({
    display:'flex',
    alignItems:'center',
    margin:'0 auto',
    padding:'0.4em',
    width:'58%',
    borderRadius:'100px',
    background:theme.palette.secondary.dark,
})


const StyledListBtn = styled(ListItemButton) ({
    borderRadius:'50px',
    marginLeft:'0.6em',
    padding:'0 0.3em',
    display:'flex',
    justifyContent:'center',
    background:theme.palette.secondary.dark,
    transition:'background 0.2s ease-in-out',
    '&:hover': {
       background:'white',
       
    },
   
})


export const DesktopNav = ({totalQuantity}) => {

    const navigate = useNavigate();

  return (
    <React.Fragment>
       <AppBar position='fixed' 
       sx={{background:'white', 
       padding:'0.6em 0'}} 
       >
            <Toolbar>

                    <UpperRowNav >
                        <Link to='/' className='nav_link'>
                            <Typography variant='h4' color={theme.palette.primary.main}
                            fontFamily='LogoFont'>
                                Hera
                            </Typography>
                        </Link>
                        <NavContainer>
                            
                            {MAIN_MENU.map((menu,index)=> {
                                return (
                                        <StyledListBtn key={index}>
                                            <Link to={menu.to} className='nav_link'>{menu.title}</Link>
                                        </StyledListBtn>
                                
                                )
                                })}
                        </NavContainer>
                        <IconButton size='middle' onClick={()=>navigate('/display_cart')}>
                            <Badge badgeContent={totalQuantity} color="error">
                                <ShoppingBasket sx={{color:theme.palette.primary.main}}/>
                            </Badge>
                        </IconButton>
                    </UpperRowNav>
            </Toolbar>
       </AppBar>
    </React.Fragment>
    
  )
}
