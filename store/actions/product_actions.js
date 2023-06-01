import axios from "axios";
import { BASE_URL } from "../URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

import *  as SecureStore  from 'expo-secure-store';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const PRODUCT_API = axios.create({baseURL : `${BASE_URL}/laundry`});
PRODUCT_API.interceptors.request.use(async(req)  =>{
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.Authorization = `Bearer bearer ${authToken.token}`
    }
    return req;
})


export const createProduct = createAsyncThunk('new/product', async(values) => {
    try{
        const response =  await PRODUCT_API.post('/new_product', {
            productName :  values.productName,
            location :  values.location,
            description :  values.description,
            email : values.email,
            telephone : values.telephone,
            photo :  values.photo,
            category :  values.category
        })

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message
    }
})

export const getAllProducts = createAsyncThunk('all/laundry', async()  =>{
    try{
        const response =  await PRODUCT_API.get('/all_products?sort=-date_created');

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return  error.message
    }
})

export const getRestaurantProducts =  createAsyncThunk('category/laundry', async(id) => {
    try{
        const response = await PRODUCT_API.get(`/restaurant_products/${id}?sort=-date_created`);

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message
    }
})