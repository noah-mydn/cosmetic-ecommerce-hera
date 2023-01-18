import React from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { Alert, AlertTitle, Box } from '@mui/material';
import { lipstickSelector,loadingSelector,errorSelector } from '../rtk/app/selectors';

export const Lips = () => {

  // const dispatch = useDispatch();

  // const loading= useSelector((state)=>state.makeup.loading);
  // const lips = useSelector((state)=>state.makeup.lipstick);
  // const error = useSelector((state)=>state.makeup.error);

  // React.useEffect(()=> {
  //   dispatch(fetchMakeup())
  // },[])

  const lips = useSelector(lipstickSelector);
  const loading = useSelector(loadingSelector);
  const error= useSelector(errorSelector);

  console.log("Loading:"+loading+" Error:"+error);

  return (
    <Box width='100%'>
       
       { (error && !loading)  ?
        <Box pt={10} mt={4} display='flex' justifyContent='center' alignItems='center' height='70vh'>
          <Alert severity="error" sx={{margin:'3em auto', padding:'3em'}}
          variant='standard'>
            <AlertTitle>Error</AlertTitle>
              Something went wrong - <strong>{error}</strong><br/><br/>
              Make sure you have your internet connection and reload the website after awhile
          </Alert>
        </Box>
          
          :

        <ProductCard products={lips} title='Lips Makeup' loadingStatus={loading}/>
    }
    </Box>
  )
 
}
