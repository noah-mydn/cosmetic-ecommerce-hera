import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {

        primary:{          
            main:'#393E46',          
        },

        secondary:{
           main:'#0E5E6F',
        },

        tertiary : {
            main: '#3A8891',
        },

        accent : {
            main:'#F2DEBA',
        },

        textColor: {
            main:'#F7F7F7'
        }
    },

    typography: {
        fontFamily: 'Noto Sans',
        fontSize: 16,
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
    }


})