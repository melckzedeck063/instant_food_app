import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts, getCategoryProducts, getRestaurantProducts } from "../actions/product_actions";


const productSlice  =   createSlice({
    name :  'laundry',
    initialState : {
        product : null,
        all_products  :  [],
        current_product : null,
        restaurant_products :[],
        status : "",
        message : ""
    },
    reducers :  {
        newLaundry : (state,action) => {
            state.product.push(action.payload)
        },
        currentProduct : (state,action) => {
            state.current_product.push(action.payload)
        },
        allProduct : (state,action) => {
            state.all_product.push(action.payload)
        }
    },
    extraReducers (builder) {
        builder
        .addCase(createProduct.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(createProduct.fulfilled, (state,action) => {
            state.status  = "Successfull",
            state.product =  action.payload,
            state.message = "New Product  created"
        })
        .addCase(createProduct.rejected, (state,action)  => {
            state.status = "Failed",
            state.message ='Request failed' ,
            state.error = action.error.message
        })
        .addCase(getAllProducts.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllProducts.fulfilled, (state,action) => {
            state.status  = "Successfull",
            state.all_products =  action.payload,
            state.message = "laundries found"
        })
        .addCase(getAllProducts.rejected, (state,action)  => {
            state.status = "Failed",
            state.message ='Request failed' ,
            state.error = action.error.message
        })
        .addCase(getRestaurantProducts.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(getRestaurantProducts.fulfilled, (state,action) => {
            state.status  = "Successfull",
            state.restaurant_products =  action.payload,
            state.message = "laundries found"
        })
        .addCase(getRestaurantProducts.rejected, (state,action)  => {
            state.status = "Failed",
            state.message ='Request failed' ,
            state.error = action.error.message
        })
    }
})

export const {newProduct, allProduct, currentProduct} =  productSlice.actions;

module.exports =  productSlice.reducer