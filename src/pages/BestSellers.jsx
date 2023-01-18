import React from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import { Alert, AlertTitle } from '@mui/material';
import { BestSellerSelector, errorSelector, loadingSelector } from '../rtk/app/selectors';
import { Box } from '@mui/system';

export const BestSellers = () => {

  // let bestsellers;
  // const dispatch = useDispatch();

  // const products= useSelector((state)=>state.makeup.make_up);
  // const loading= useSelector((state)=>state.makeup.loading);
  // const error = useSelector((state)=>state.makeup.error);

   
  // if(products)
  //       {
  //         bestsellers = products.filter((bestseller)=> {
  //         return (bestseller.rating>4.0)
  //       })
  //     }

  // React.useEffect(()=>{
  //   dispatch(fetchMakeup())
  // },[])
  const loading = useSelector(loadingSelector);
  const error= useSelector(errorSelector);
  const bestsellers = useSelector(BestSellerSelector);
  

  console.log("Loading:"+loading+" Error:"+error);

  return (
    <Box width='100%'>
       
       { (!bestsellers || (error && !loading))  ?
        <Box pt={10} mt={4} display='flex' justifyContent='center' alignItems='center' height='70vh'>
          <Alert severity="error" sx={{margin:'3em auto', padding:'3em'}}
          variant='standard'>
            <AlertTitle>Error</AlertTitle>
              Something went wrong - <strong>{error}</strong><br/><br/>
              Make sure you have your internet connection and reload the website after awhile
          </Alert>
        </Box>
          
          :

        <ProductCard products={bestsellers} title='Bestsellers Collections' loadingStatus={loading}/>
    }
    </Box> )
}
