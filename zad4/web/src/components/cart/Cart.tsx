import React from 'react';
import {CartProps} from "./CartType";

function Cart({products}: CartProps) {
    return (
        <div>
            Product amount: {products.length}
        </div>
    );
}

export default Cart;
