import { Email, Facebook, Instagram, Phone, Twitter, WhatsApp } from '@mui/icons-material'
import { Grid, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { theme } from '../style/theme'

export const Footer = () => {

    const matchScreen = useMediaQuery(theme.breakpoints.up('md'));
    const phoneScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box pt={8} name='footer'>
        <Grid display='grid'
              gridTemplateColumns={matchScreen ? '1fr 1fr 1fr auto' : phoneScreen? '1fr' : '1fr 1fr'}
              flexWrap='wrap'
              alignItems='center'
              px={2}
              py={3}
              bgcolor={theme.palette.secondary.dark}>
            
        <Grid item md={3} color='white' display='flex' flexDirection='column' marginRight={phoneScreen ? 'none' : 'auto'}
        textAlign={phoneScreen ? 'center' : 'left'}>
            <Typography variant='h6' fontWeight='bold' gutterBottom >
                About
            </Typography>
            <Typography variant='body2' gutterBottom pt={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus feugiat porttitor.Maecenas ut fringilla lorem.
            </Typography>
            <Box display='flex' pt={4} justifyContent={phoneScreen ? 'center' : ''}>
                <img src='./assets/images/visa.svg' alt='Visa Card Payment' width='40' height='25' style={{marginRight:'2px'}}/>
                <img src='./assets/images/mastercard.svg' alt='Visa Card Payment' width='40' height='25' style={{marginRight:'2px'}}/>
                <img src='./assets/images/paypal.svg' alt='Visa Card Payment' width='40' height='25' style={{marginRight:'2px'}}/>
                <img src='./assets/images/amex.svg' alt='Visa Card Payment' width='40' height='25' style={{marginRight:'2px'}}/>
            </Box>
        </Grid>

        {matchScreen &&
        <>
            <Grid  item md={3} color='white' display='flex' flexDirection='column'
             justifySelf='center'>
                <Typography variant='h6' fontWeight='bold'>
                    Categories
                </Typography>
                <List dense='true'>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Hot Sale
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Women Collections
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Men Collections
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Accessories
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Perfumes
                        </Typography>
                    </ListItemText>
                </List>
            </Grid>

            <Grid  item md={3} color='white' display='flex' flexDirection='column'>
                <Typography variant='h6' fontWeight='bold'>
                    Information
                </Typography>
                <List dense='true'>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            About Us
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Contact Us
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Help Center
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography component='subtitle2' variant='caption'>
                            Terms and Conditions
                        </Typography>
                    </ListItemText>
                    <ListItemText>
                        <Typography variant='subtitle2'>
                            Privacy Policy
                        </Typography>
                    </ListItemText>
                </List>
            </Grid>
        </>
        }

        <Grid item md={3} color='white' display='flex' flexDirection='column' marginLeft={phoneScreen ? 'none' : 'auto'}
        pt={phoneScreen ? 4 : 0} textAlign={phoneScreen ? 'center' : ''}>
            <Typography variant='h6' fontWeight='bold' gutterBottom>
                Contact
            </Typography>
            <Typography variant='body2' gutterBottom>
                221b Baker St, London NW1 6XE, {phoneScreen ? '' : <br/>} United Kingdom
            </Typography>
            <Typography variant='body2' display='inline-flex' alignItems='center' justifyContent={phoneScreen ? 'center' : ''}>
                <Phone/>&nbsp;&nbsp;012-34-6789
            </Typography>

            <Typography variant='body2' display='inline-flex' alignItems='center' justifyContent={phoneScreen ? 'center' : ''}>
                <Email/>&nbsp;&nbsp;hera@liverpool.com
            </Typography>

            <Box display='flex' pt={1} justifyContent={phoneScreen ? 'center' : ''}>
                <Facebook sx={{marginRight:'2px', pointer:'cursor', fontSize:25}}/>
                <Instagram sx={{marginRight:'2px', pointer:'cursor', fontSize:25}}/>
                <Twitter sx={{marginRight:'2px', pointer:'cursor', fontSize:25}}/>
                <WhatsApp sx={{marginRight:'2px', pointer:'cursor', fontSize:25}}/>
            </Box>
        </Grid>

        </Grid>
        <Box width='100%' py={2} bgcolor='#28282b' color='#fff' textAlign='center' 
        fontFamily={theme.palette.fontFamily} fontSize={12}>
            Copyright &copy;2022 All Rights Reserved | Designed by 
            <a href='https://github.com/noah_mydn' style={{textDecoration:'none', 
            color:'yellow'}}> May Yadanar </a>
        </Box>
    </Box>
  )
}
