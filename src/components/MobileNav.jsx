import styled from '@emotion/styled'
import { AppBar, Badge, Divider, Drawer, IconButton, ListItemButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Cancel, ShoppingBasket } from '@mui/icons-material'
import { theme } from '../style/theme';
import { MAIN_MENU } from '../data/navData'
import { Link, useNavigate } from 'react-router-dom';
import { Email, Facebook, Instagram, Phone, Twitter, WhatsApp } from '@mui/icons-material'


const CustomNavMobile = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    padding:'0 1em',
})

const StyledListItemBtn = styled(ListItemButton)({
    padding:'1em',
})

export const MobileNav = ({totalQuantity}) => {

    const [open,setOpen] = React.useState(false);
    const toggleNavigation = () => {
        setOpen(!open);
    }

    const navigate = useNavigate();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const drawerNav = (
        <Box sx={{width: isMobile ? '100vw' : '50vw',
                 }}>
            <Box sx={{
                padding:'0.5em 0.8em',
                display:'flex',
                justifyContent:'space-between'
            }}>
                <Typography variant='h4' color={theme.palette.primary.main}
                fontFamily='LogoFont'>
                            Hera
                </Typography>

                <IconButton onClick={toggleNavigation}>
                    <Cancel sx={{color:theme.palette.primary.main}}/>
                </IconButton>
            </Box>
            <Divider/>
            {MAIN_MENU.map((menu)=> (
                <StyledListItemBtn key={menu.to}>
                    <Link className='mobile_nav_link' to={menu.to}>
                        {menu.title}
                    </Link>
                </StyledListItemBtn>
            ))}
            <Divider/>
                <Box color='white' display='flex' flexDirection='column' bgcolor={theme.palette.primary.main}
                        pt={2} pl={2} pb={2}>
                            <Typography variant='h6' fontWeight='bold' gutterBottom>
                                Contact
                            </Typography>
                            <Typography variant='body2' gutterBottom>
                                221b Baker St, London NW1 6XE, <br/>United Kingdom
                            </Typography>
                            <Typography variant='body2' display='inline-flex' gutterBottom>
                                <Phone/>&nbsp;&nbsp;012-34-6789
                            </Typography>

                            <Typography variant='body2' display='inline-flex' gutterBottom>
                                <Email/>&nbsp;&nbsp;hera@liverpool.com
                            </Typography>

                            <Box display='flex' pt={1} justifyContent='flex-start'>
                                <Facebook sx={{marginRight:'3px', pointer:'cursor', fontSize:25}}/>
                                <Instagram sx={{marginRight:'3px', pointer:'cursor', fontSize:25}}/>
                                <Twitter sx={{marginRight:'3px', pointer:'cursor', fontSize:25}}/>
                                <WhatsApp sx={{marginRight:'3px', pointer:'cursor', fontSize:25}}/>
                            </Box>
                </Box>
        </Box>
    )



  return (
    <AppBar position='fixed'
    sx={{background:'white', 
    padding:'1em 0'}} 
    >
         <Toolbar>
            <CustomNavMobile>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleNavigation}
                >
                    <Drawer
                    variant='temporary'
                    anchor='left'
                    open={open}
                    onClose={toggleNavigation}
                    onOpen={toggleNavigation}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                      }}>
                        {drawerNav}
                    </Drawer>
                    <MenuIcon 
                    sx={{color:theme.palette.primary.main, 
                    fontSize:'1em'}}
                    />
                </IconButton>
                <Typography variant='h4' color={theme.palette.primary.main}
                fontFamily='LogoFont'>
                            Hera
                </Typography>
                <IconButton size='large' onClick={()=>navigate('/display_cart')}>
                    <Badge badgeContent={totalQuantity} color="error">
                        <ShoppingBasket sx={{color:theme.palette.primary.main, fontSize:'1em'}}/>
                    </Badge>
                </IconButton>
            </CustomNavMobile>
         

         </Toolbar>

    </AppBar>
  )
}
