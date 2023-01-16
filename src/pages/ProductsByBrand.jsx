import { ArrowBackIos } from '@mui/icons-material'
import { Alert, AlertTitle, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BrandCollection } from '../components/BrandCollection'
import { glossierSelector, covergirlSelector,wet_n_wildSelector,maybellineSelector,
nyxSelector,lorealSelector,annabelleSelector,revlonSelector, loadingSelector, errorSelector } from '../rtk/app/selectors'

export const ProductsByBrand = ({openBrand}) => {
    
    let brandSelector;

    switch(openBrand) {
      case 'glossierSelector' : brandSelector= glossierSelector; break;
      case 'covergirlSelector' : brandSelector= covergirlSelector; break;
      case 'wet_n_wildSelector' : brandSelector= wet_n_wildSelector; break;
      case 'maybellineSelector' : brandSelector= maybellineSelector; break;
      case 'nyxSelector' : brandSelector= nyxSelector; break;
      case 'lorealSelector' : brandSelector= lorealSelector; break;
      case 'annabelleSelector' : brandSelector= annabelleSelector; break;
      case 'revlonSelector' : brandSelector= revlonSelector; break;

      default:
        brandSelector= revlonSelector;
    }

    const brand = useSelector(brandSelector);

    const loading = useSelector(loadingSelector);
    const error= useSelector(errorSelector);
    console.log(loading);
    console.log(error);




  return (
    <Box width='100%'>
       
       { (error && !loading)  &&
        <Box pt={10} mt={4} display='flex' justifyContent='center' alignItems='center'>
          <Alert severity="error" sx={{margin:'3em auto', padding:'3em'}}
          variant='standard'>
            <AlertTitle>Error</AlertTitle>
              Something went wrong - <strong>{error}</strong><br/><br/>
              Make sure you have your internet connection and reload the website after awhile
          </Alert>
        </Box>
        }

    {brand.length>=0 && 
      <Box container 
    sx={{paddingTop:'6.5em'}}>
        <Link className='nav_link' style={{paddingBottom:'2em'}} to='/discover'>
            <IconButton>
                <ArrowBackIos color='secondary'/>
            </IconButton>
        </Link>
        <BrandCollection products={brand} loadingStatus={loading} code={openBrand}/>
        
    </Box>
  }
  </Box>
  )
}
