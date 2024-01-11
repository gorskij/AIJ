import React from 'react';
import {CartProps} from "./CartType";
import CartIcon from "./shopping-cart-2.svg";
import styles from "./Cart.module.css";

function Cart({products}: CartProps) {
    return (
        <div className={styles.cart}>
            <img className={styles.icon} src={CartIcon} alt="Koszyk"/>
            <div className={styles.amount}>{products.length}</div>
        </div>
    );
}

export default Cart;
