import { useMediaQuery } from '@mui/material'
import React from 'react'
import { theme } from '../style/theme'
import { MobileNav } from './MobileNav'
import { DesktopNav } from './DesktopNav'
import { useSelector } from 'react-redux'

export const Navbar = () => {
    const screenMatch = useMediaQuery(
        theme.breakpoints.down('md')
    );

    const totalQuantity = useSelector((state)=>state.cart.totalQuantity);
  return (
    <React.Fragment>
        {screenMatch ?  <MobileNav totalQuantity={totalQuantity}/> : <DesktopNav totalQuantity={totalQuantity}/>}
    </React.Fragment>
    
  )
}
