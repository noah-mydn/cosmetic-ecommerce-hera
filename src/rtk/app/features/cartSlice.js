import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    totalQuantity:0,
    totalAmount:0,
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers : 
        {
            addToCart(state,action) {
            const cartItemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id);

            if(cartItemIndex >= 0) {
                state.cartItems[cartItemIndex].cartQuantity += action.payload.cartQuantity;
                
                if(action.payload.cartQuantity!==0) {
                    toast.info(`${action.payload.name} is added to the cart again!`,
                    {position:'top-right'})
                }
                
            }

            else {
                const tempProduct = {...action.payload, cartQuantity:action.payload.cartQuantity};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} is added to the cart!`,
                {position:'top-right'})
            }

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            
        },

        removeCartItem(state,action) {
          const inCartItems =  state.cartItems.filter(
                cartItem => cartItem.id!==action.payload.id
            );
            state.cartItems=inCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} is removed from the cart!`,
                {position:'bottom-right'})
        },

        decreaseCartQuantity(state,action ) {
                const itemIndex= state.cartItems.findIndex(
                    cartItem => cartItem.id === action.payload.id
                )
                
                if(state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity-= 1;
                }

                else if(state.cartItems[itemIndex].cartQuantity === 1) {
                    const inCartItems =  state.cartItems.filter(
                        cartItem => cartItem.id!==action.payload.id
                    );
                    state.cartItems=inCartItems;
                    toast.error(`${action.payload.name} is removed from the cart!`,
                        {position:'bottom-right'})
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
                
        },

        increaseCartQuantity(state,action) {
            const itemIndex= state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
                state.cartItems[itemIndex].cartQuantity+= 1;
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))            
        },

        clearAllCart(state) {
            state.cartItems = [];
            toast.error(`The cart is cleared!`,
                        {position:'bottom-right'});
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));  

        },

        getTotal(state) {
            let {total,quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price,cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity

                return cartTotal;
            }, {
                total:0,
                quantity:0,
            });

            state.totalQuantity = quantity;
            state.totalAmount = total;
        }

    }
})

export const {addToCart, removeCartItem, decreaseCartQuantity,
    increaseCartQuantity,clearAllCart, getTotal} = cartSlice.actions;
export default cartSlice.reducer;