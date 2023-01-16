import { ArrowCircleUp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

var Scroll = require('react-scroll')


var scroll = Scroll.animateScroll;

export const ScrollToTopElement = (
    
    <Box width='100%' display='flex' pt={2}
    justifyContent='flex-end'>
        <IconButton onClick={()=>scroll.scrollToTop()} size='large'>
            <ArrowCircleUp color='secondary' fontSize='18'/>
        </IconButton>
    </Box>
);  

    
