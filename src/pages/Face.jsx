import React from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { Alert, AlertTitle, Box } from '@mui/material';
import { errorSelector, FaceSelector, loadingSelector } from '../rtk/app/selectors';

export const Face = () => {

//   let face;
//   const dispatch = useDispatch();
//   const allProducts = useSelector((state)=> state.makeup.make_up)
//   const loading= useSelector((state)=>state.makeup.loading);
//   const error = useSelector((state)=>state.makeup.error);

//   if(allProducts) {
//     face = allProducts.filter((face)=> face.product_type!=='nail_polish');
//   }
   

//  React.useEffect(()=> {
//     dispatch(fetchMakeup())
//  },[])

  const face = useSelector(FaceSelector);
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

        <ProductCard products={face} title='Face Makeup' loadingStatus={loading}/>
    }
    </Box>
  )
}
