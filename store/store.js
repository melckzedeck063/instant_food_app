import { configureStore } from '@reduxjs/toolkit'

import users from './reducers/user_reducer';
// import service   from './reducers/service_reducer';
import restaurant from './reducers/restaurant_reducer'
import product  from './reducers/product_reducer'
import cartItem from './reducers/cart_reducer'
import orders from './reducers/order_reducer'

export default configureStore({

    reducer : {
        users,
        restaurant,
        product,
        cartItem,
        orders
        // service
    }
})