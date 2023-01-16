import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    make_up : [],
    foundation:[],
    lipstick:[],
    mascara:[],
    nailPolish:[],
    blush:[],
    bronzer:[],
    eyeshadow:[],
    eyeliner:[],
    face:[],
    eyes:[],
    annabelle:[],
    covergirl:[],
    wet_n_wild:[],
    glossier:[],
    loreal:[],
    maybelline:[],
    nyx:[],
    revlon:[],
    error:'',

}

//Generated pending, fulfilled and rejected aciton types
export const fetchMakeup = createAsyncThunk('makeup/fetchMakeup', ()=> {
    return axios
    .get('http://makeup-api.herokuapp.com/api/v1/products.json')
    .then ((res) => res.data)
})

const makeUpSlice = createSlice({
    name:'makeup',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchMakeup.pending, state => {
            state.loading= true;
        })

        builder.addCase(fetchMakeup.fulfilled, (state,action) => {
            state.loading = false;
            state.make_up = action.payload.filter(product => {
                return (
                    product.brand==='glossier' ||
                    product.brand==='covergirl' ||
                    product.brand==='wet n wild' ||
                    product.brand==='annabelle' ||
                    product.brand==="l'oreal" ||
                    product.brand==='maybelline' ||
                    product.brand==='nyx' ||
                    product.brand==='revlon' 
                );
            });
            //Classifying by product_type
            state.foundation = state.make_up.filter(product => product.product_type === 'foundation');
            state.lipstick = state.make_up.filter(product => product.product_type === 'lipstick');
            state.mascara = state.make_up.filter(product => product.product_type === 'mascara');
            state.nailPolish = state.make_up.filter(product => product.product_type === 'nail_polish');
            state.blush = state.make_up.filter(product => product.product_type === 'blush');
            state.bronzer = state.make_up.filter(product => product.product_type === 'bronzer');
            state.eyeshadow = state.make_up.filter(product => product.product_type === 'eyeshadow');
            state.eyeliner = state.make_up.filter(product => product.product_type === 'eyeliner');

            //Classifying by brand
            state.covergirl = state.make_up.filter(product => product.brand === 'covergirl');
            state.annabelle = state.make_up.filter(product => product.brand === 'annabelle');
            state.wet_n_wild = state.make_up.filter(product => product.brand === 'wet n wild');
            state.nyx = state.make_up.filter(product => product.brand === 'nyx');
            state.maybelline = state.make_up.filter(product => product.brand === 'maybelline');
            state.revlon = state.make_up.filter(product => product.brand === 'revlon');
            state.glossier = state.make_up.filter(product => product.brand === 'glossier');
            state.loreal = state.make_up.filter(product => product.brand === "l'oreal");

            //Classifying by areas of usage
            state.face = state.make_up.filter(product => product.product_type !== 'nail_polish');
            state.eyes = [].concat(state.eyeshadow, state.eyeliner, state.mascara);
            state.bestseller = state.make_up.filter(product=>product.rating>4.0);
            state.error='';

        })
    
        builder.addCase(fetchMakeup.rejected, (state,action)=> {
            state.loading=false;
            state.make_up=null;
            state.foundation=null;
            state.lipstick=null;
            state.mascara=null;
            state.nailPolish=null;
            state.blush=null;
            state.bronzer=null;
            state.eyeshadow=null;
            state.eyeliner=null;
            state.annabelle=null;
            state.covergirl=null;
            state.wet_n_wild=null;
            state.glossier=null;
            state.nyx=null;
            state.maybelline=null;
            state.revlon=null;
            state.loreal=null;
            state.face=null;
            state.eyes=null;
            state.error= action.error.message;
        })

      

    }
})


export default makeUpSlice.reducer;