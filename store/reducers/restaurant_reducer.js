import { createSlice } from "@reduxjs/toolkit";
import { getAllRestaurant, registerRestaurant } from "../actions/restaurant_action";


const  RestaurantSlice =  createSlice({
    name :  'restaurant',
    initialState  : {
        restaurants :  [],
        restaurant :  null,
        current_restaurant  :  null,
        status : "",
        message : '',
        error :  ''
    },
    reducers : {
        newRestaurant : (state,action) => {
            state.restaurant.push(action.payload)
        },
        allRestaurants :  (state,action) => {
            state.restaurants.push(action.payload)
        },
        currentRestaurant : (state,action) => {
            state.current_restaurant.push(action.payload)
        }
    },
    extraReducers  (builder){
        builder
        .addCase(registerRestaurant.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(registerRestaurant.fulfilled, (state,action) => {
            state.status = "Succesfull",
            state.restaurant = action.payload,
            state.message ="New restaurant registered succesfull"
        })
        .addCase(registerRestaurant.rejected, (state,action) => {
            state.status = "Failed",
            state.error  = action.error.message
        })
        .addCase(getAllRestaurant.pending, (state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllRestaurant.fulfilled, (state,action) => {
            state.status = "Succesfull",
            state.restaurants = action.payload,
            state.message ="restaurants data found succesfull"
        })
        .addCase(getAllRestaurant.rejected, (state,action) => {
            state.status = "Failed",
            state.error  = action.error.message
        })
    }
})

export const  {newRestaurant, currentRestaurant,allRestaurants}  = RestaurantSlice.actions;

export default RestaurantSlice.reducer;