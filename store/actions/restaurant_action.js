import axios from "axios";
import {BASE_URL} from  '../URL'
axios.defaults.headers.post['Content-Type'] = 'application/json';
import * as  SecureStore  from 'expo-secure-store'
import { createAsyncThunk } from "@reduxjs/toolkit";

const RESTAURANT_API  =  axios.create({baseURL :  `${BASE_URL}/restaurant` });
RESTAURANT_API.interceptors.request.use(async(req) =>  {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})

export  const registerRestaurant  = createAsyncThunk ( 'new/category', async(values) => {
    // console.log(values)
    try{
        const response  =  await RESTAURANT_API.post('/new_restaurant', {
            restaurantName :  values.restaurantName,
            description :  values.description,
            photo : values.photo,
            location : values.location,
            contacts :  values.contacts,
            email :  values.email,
            address :  values.geo
        })

        // console.log(response);
        return  response.data
    }
    catch(error){
        console.log(error.response);
        return  error.message
    }
})

export  const getAllRestaurant =  createAsyncThunk('all/categ', async () => {
    // console.log('called function')
    try{
        const  response =  await RESTAURANT_API.get(`/restaurants`);

        // console.log(response.data);
        return  response.data
    }
    catch(error){
        console.log(error)
        return   error.message
    }
})