
import axios from 'axios';
import { AUTH_URL,BASE_URL } from '../URL';
import *  as SecureStore from 'expo-secure-store'
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.headers.post['Content-Type'] = "application/json";

const AUTH_API = axios.create({baseURL : AUTH_URL});
AUTH_API.interceptors.request.use(async (req) => {
    const storage = await  SecureStore.getItemAsync('token');
    const authToken =  JSON.parse(storage)
    
    if (authToken !== null || authToken !== undefined) {
        // console.log(storage)
        req.headers.authorization = `Bearer bearer ${authToken.token}`
    }
// console.log(req)
    return req
})


export const signInUser = createAsyncThunk ("user/login", async (values) => {
    // console.log("values : " , values)
    try{
        const  response =   await  axios.post(`${BASE_URL}/user/login`, {
          email  :  values.username,
          password :   values.password
        })
        console.log(response.data)
        await SecureStore.setItemAsync('token', JSON.stringify(response.data))
         return  response.data
    }
    catch(error){
        console.log(error.response)
        return  error.message
    }
})

export const  signUpUser =  createAsyncThunk ('user/signup', async(values) => {
    try  {

        const response =  await axios.post(`${BASE_URL}/user/signup`, {
            firstName :  values.firstName,
            lastName :   values.lastName,
            email :  values.username,
            telephone : values.telephone,
            password : values.password,
            gender : " ",
            confirmPassword : values.confirmPassword
        })
        // console.log("called");
        console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        console.log(error.response.data)
    }
})

export  const becomeDriver =  createAsyncThunk('new/driver',  async(values) => {
    try{
         const  response =  await AUTH_API.patch('/become_driver', {
            vehicleNo : values.vehicleNo,
            licenseNo :  values.licenseNo,
            station :  values.station,
            role :  "driver"
         })

         console.log(response.data);
         return response.data
    }
    catch(error){
        console.log(error.response)
    }
})

export const updateLocation =   createAsyncThunk('new/location', async(values) => {
    console.log("values :  " ,values)
    try{
        const response =   await AUTH_API.patch('/update_location',  {
            latlong : values
        })

        console.log(response.data);
        return response.data
    }
    catch(error){
        console.loge(error);
        return error.response
    }
})

export const findDriversAvailable = createAsyncThunk('all/drivers', async() =>{
    try{
        const response =  await AUTH_API.get('/drivers')

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error)
        return error.message
    }
})