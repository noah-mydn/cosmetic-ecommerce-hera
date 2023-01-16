import { Alert, AlertTitle, Box } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { errorSelector, EyesSelector, loadingSelector } from '../rtk/app/selectors';

export const Eyes = () => {
    
    // const dispatch = useDispatch();

    // const loading= useSelector((state)=>state.makeup.loading);
    // const eyeshadow = useSelector((state)=> state.makeup.eyeshadow);
    // const eyeliner = useSelector((state)=>state.makeup.eyeliner);
    // const mascara = useSelector((state)=>state.makeup.mascara);
    // const error = useSelector((state)=>state.makeup.error)
    // let products;


    // React.useEffect(()=> {
    //     dispatch(fetchMakeup())
    // },[])

    const eyes = useSelector(EyesSelector);
    const loading= useSelector(loadingSelector);
    const error = useSelector(errorSelector);

    // if(eyeshadow && eyeliner && mascara) 
    // { products = [...eyeshadow.slice(0,10), 
    //                   ...eyeliner.slice(0,10), 
    //                   ...mascara.slice(0,10)]
    // }

    console.log(loading)

  return (
    <Box width='100%'>
       
       { (error && !loading)  ?
        <Box pt={10} mt={4} display='flex' justifyContent='center' alignItems='center'>
          <Alert severity="error" sx={{margin:'3em auto', padding:'3em'}}
          variant='standard'>
            <AlertTitle>Error</AlertTitle>
              Something went wrong - <strong>{error}</strong><br/><br/>
              Make sure you have your internet connection and reload the website after awhile
          </Alert>
        </Box>
          
          :

        <ProductCard products={eyes} title='Eye Makeup' loadingStatus={loading}/>
    }
    </Box>
    
  )
}
