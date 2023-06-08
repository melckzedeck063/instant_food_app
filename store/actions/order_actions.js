
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import *  as SecureStore from 'expo-secure-store';

// import { response } from "express";
import { BASE_URL } from "../URL";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const ORDER_API = axios.create({ baseURL: `${BASE_URL}/orders` });
ORDER_API.interceptors.request.use(async(req) => {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.authorization = `Bearer bearer ${authToken.token}`
    }
// console.log(req)
    return req
})


export const placeOrder = createAsyncThunk('/order', async(values) => {
    // console.log("values : ",values)
    try{
        const response =  await ORDER_API.post('/create_order',  {
            order_items : values.order_items,
            total_cost : values.costs
        })

        // console.log(response.data);
        return response.data
    }
    catch(error) {
        console.log(error)
        return error.message
    }
})

export const getAllOrders =   createAsyncThunk('all/orders', async () => {
    try{
        const response =  await ORDER_API.get('/all_orders');

        // console.log(response.data);
        return  response.data
    }
    catch(error) {
        console.log(error);
        return error.message
    }
})

export const getMyOrders = createAsyncThunk('my_orders', async() => {
    try{
          const response =  await ORDER_API.get('/my_orders');

        //   console.log(response.data);
          return  response.data
    }
    catch(error){
        console.log(error)
        return error.message
    }
})


export const confirmOrder = createAsyncThunk('/confirm',  async  (id) => {
    // console.log(id)
    try{
         const response =  await ORDER_API.put(`/update_order/${id}`, {
            order_status : "confirmed"
         })
         console.log(response.data)
         return response.data
    }
    catch(error) {
        console.log(error)
        return   error.message
    }
})

export const  deleteOrder =  createAsyncThunk('/delete_order', async (id) => {
    try{
          const resonse =  await ORDER_API.delete(`/delete_order/${id}`);

          console.log(resonse.data);
          return  response.data
    }
    catch(error) {
        console.log(error);
        return  error.message
    }

})